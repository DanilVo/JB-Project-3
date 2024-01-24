import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CredentialModel from "../3-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../3-models/error-models";
import RoleModel from "../3-models/role-model";
import UserModel from "../3-models/user-model";

class AuthService {
  private readonly INSERT_USER_SQL =
    "INSERT INTO users(uuid,firstName,lastName,email,password,roleId) VALUES(?,?,?,?,?,?)";
  private readonly SELECT_USER_SQL =
    "SELECT * FROM users WHERE email = ? AND password = ?";
  private readonly COUNT_EMAIL_SQL = "SELECT * FROM users WHERE email = ?";

  public async register(user: UserModel): Promise<string> {
    user.userUuid = cyber.hashPassword(user.email);
    user.userValidation();
    if (await this.isEmailTaken(user.email))
      throw new ValidationError(
        `User with Email ${user.email} already exists.`
      );
    user.password = cyber.hashPassword(user.password);
    user.roleId = RoleModel.user;
    const sql = this.INSERT_USER_SQL;
    const info: OkPacket = await dal.execute(sql, [
      user.userUuid,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.roleId,
    ]);
    user.userId = info.insertId;
    const token = cyber.getNewToken(user);

    return token;
  }

  public async login(credentials: CredentialModel): Promise<string> {
    credentials.validation();

    credentials.password = cyber.hashPassword(credentials.password);
    const sql = this.SELECT_USER_SQL;
    const users = await dal.execute(sql, [
      credentials.email,
      credentials.password,
    ]);
    if (users.length === 0)
      throw new UnauthorizedError("Incorrect Email or Password");
    const user = users[0];
    const token = cyber.getNewToken(user);
    return token;
  }

  public async isEmailTaken(email: string): Promise<boolean> {
    const sql = this.COUNT_EMAIL_SQL;
    const count = await dal.execute(sql, [email]);
    return count.length > 0;
  }
}

const authService = new AuthService();
export default authService;
