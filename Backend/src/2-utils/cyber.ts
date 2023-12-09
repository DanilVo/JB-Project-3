import UserModel from '../3-models/user-model';
import { Request } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import crypto from 'crypto';
import { UnauthorizedError } from '../3-models/error-models';
import RoleModel from '../3-models/role-model';

class Cyber {
  private secretKey = 'DanilVolobuyevJ`honBryceProject3';

  public getNewToken(user: UserModel): string {
    delete user.password;
    const container = { user };
    const options = { expiresIn: '1d' };
    const token = jwt.sign(container, this.secretKey, options);
    return token;
  }

  public verifyToken(token: string): boolean {
    if (!token) throw new UnauthorizedError('You are not logged in');
    try {
      jwt.verify(token, this.secretKey);
      return true;
    } catch (err: any) {
      throw new UnauthorizedError(err.message);
    }
  }

  public verifyAdmin(token: string): void {
    this.verifyToken(token);
    const container = jwt.verify(token, this.secretKey) as { user: UserModel };
    const user = container.user;
    if (user.roleId !== RoleModel.admin)
      throw new UnauthorizedError('Access restricted');
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
