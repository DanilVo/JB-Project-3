import dotenv from "dotenv";
import { Auth, google } from "googleapis";
import nodemailer from "nodemailer";
import dal from "../2-utils/dal";
import logger from "../2-utils/logger";
import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/error-models";
import VerificationUserModel from "../3-models/verificationUser-model";
import StatusCode from "../3-models/status-codes";
dotenv.config();

class MailService {
  private readonly COUNT_EMAIL_SQL = "SELECT * FROM users WHERE email = ?";

  private verificationCode = Math.floor(100000 + Math.random() * 900000);

  private mailOptions = (toEmail: string) => {
    return {
      from: process.env.MY_EMAIL,
      to: toEmail,
      subject: "Password recovery",
      generateTextFromHTML: true,
      html: `
      <p>Verification code: ${this.verificationCode}</p>
      <p>Trip Blitz 🌴</p>
      <p>If you didn't request this code, you can safely ignore this email.</p>
      <p>Someone else might have typed your email address by mistake.</p>
      `,
    };
  };

  private oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  public async passwordRecovery(toEmail: string) {
    const userExists = await this.checkUserExistence(toEmail);
    if (!userExists) {
      throw new ValidationError(
        `User with Email ${toEmail} doesn't exist.`,
        StatusCode.NotFound
      );
    }
    this.setOAuth2Credentials();
    const accessToken = await this.getOAuth2AccessToken();
    const transport = this.createEmailTransport(accessToken);
    return this.sendPasswordRecoveryEmail(transport, toEmail);
  }

  private async checkUserExistence(email: string): Promise<boolean> {
    return await this.isUserExists(email);
  }

  private setOAuth2Credentials() {
    this.oAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });
  }

  private async getOAuth2AccessToken(): Promise<string> {
    const { token } = await this.oAuth2Client.getAccessToken();
    return token;
  }

  private createEmailTransport(accessToken: string) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MY_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  private async sendPasswordRecoveryEmail(
    transport: any,
    toEmail: string
  ): Promise<any> {
    try {
      const info = await transport.sendMail(this.mailOptions(toEmail));
      this.logVerificationUser(toEmail);
      transport.close();
      return info;
    } catch (err) {
      throw new ValidationError(err); 
    }
  }

  private logVerificationUser(email: string) {
    logger.logVerificationUser({
      email: email,
      verificationCode: this.verificationCode,
    });
  }

  public async verificationCodeCheck(verificationCode: number): Promise<void> {
    const user: VerificationUserModel = await logger.readVerificationUser();
    if (user && user.verificationCode === verificationCode) {
      return;
    } else {
      throw new ResourceNotFoundError();
    }
  }

  public async isUserExists(email: string): Promise<boolean> {
    const sql = this.COUNT_EMAIL_SQL;
    const count = await dal.execute(sql, [email]);
    return count.length > 0;
  }
}

const mailService = new MailService();
export default mailService;
