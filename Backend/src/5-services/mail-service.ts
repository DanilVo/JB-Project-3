import { google } from "googleapis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dal from "../2-utils/dal";
import { ValidationError } from "../3-models/error-models";
import logger from "../2-utils/logger";
dotenv.config();

class MailService {
  private readonly COUNT_EMAIL_SQL = "SELECT * FROM users WHERE email = ?";

  public async passwordRecovery(toEmail: string) {
    if (!(await this.isUserExists(toEmail))) {
      throw new ValidationError(`User with Email ${toEmail} doest't exists.`);
    }
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    const ACCESS_TOKEN = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MY_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN.token,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: toEmail,
      subject: "Password recovery",
      generateTextFromHTML: true,
      html: `
        <p>Verification code: ${verificationCode}</p>
        <p>Trip Blitz 🌴</p>
        <p>If you didn't request this code, you can safely ignore this email.</p>
        <p>Someone else might have typed your email address by mistake.</p>
        `,
    };
    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (err, info) => {
        if (err) reject(err);
        resolve(info);
        logger.logVerificationUser({
          email: toEmail,
          verificationCode: verificationCode,
        });
        transport.close();
      });
    });
  }

  public verificationCodeCheck(verificationCode:number): void {
    const user = logger.readVerificationUser();
    
  }

  public async isUserExists(email: string): Promise<boolean> {
    const sql = this.COUNT_EMAIL_SQL;
    const count = await dal.execute(sql, [email]);
    return count.length > 0;
  }
}

const mailService = new MailService();
export default mailService;
