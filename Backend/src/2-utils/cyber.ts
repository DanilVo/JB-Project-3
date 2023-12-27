import crypto from "crypto";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../3-models/error-models";
import RoleModel from "../3-models/role-model";
import UserModel from "../3-models/user-model";

class Cyber {
  private secretKey = process.env.JWT_SECRET;
  private salt = process.env.SALT_SECRET;
  private expiresIn = "1d";

  public getNewToken(user: UserModel): string {
    
    delete user.password;
    const container = { user };
    const options = { expiresIn: this.expiresIn };
    const token = jwt.sign(container, this.secretKey, options);
    return token;
  }

  public verifyToken(token: string): boolean {
    if (!token) throw new UnauthorizedError("You are not logged in");
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
      throw new UnauthorizedError("Access denied");
  }

  public hashPassword(plainText: any): string {
    if (!plainText) return null;
    const salt = this.salt;
    const hashedPassword = crypto
      .createHmac("sha512", salt)
      .update(plainText)
      .digest("hex");
    return hashedPassword;
  }
}

const cyber = new Cyber();
export default cyber;
