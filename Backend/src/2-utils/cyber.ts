import UserModel from '../3-models/user-model';
import { Request } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import crypto from 'crypto';

class Cyber {
  private secretKey = 'DanilVolobuyevJ`honBryceProject3';

  public getNewToken(user: UserModel): string {
    delete user.password;
    const container = { user };
    const options = { expiresIn: '1d' };
    const token = jwt.sign(container, this.secretKey, options);
    return token;
  }

  public verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const header = request.header('authorization');
        if (!header) {
          resolve(false);
          return;
        }
        const token = header.substring(7);
        if (!token) {
          resolve(false);
          return;
        }
        jwt.verify(token, this.secretKey, (err: JsonWebTokenError) => {
          if (err) {
            resolve(false);
            return;
          }
          resolve(true);
        });
      } catch (err: any) {
        reject(err);
      }
    });
  }

  public hashPassword(plainText: string): string {
    if (!plainText) return null;
    const salt = 's3cr3tS@ltForH@sh1ng';
    const hashedPassword = crypto
      .createHmac('sha512', salt)
      .update(plainText)
      .digest('hex');
    return hashedPassword;
  }
}

const cyber = new Cyber();
export default cyber;
