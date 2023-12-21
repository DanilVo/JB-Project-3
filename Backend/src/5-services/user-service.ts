import dal from "../2-utils/dal";
import UserModel from "../3-models/user-model";

class UserService {
  private readonly SELECT_ONE_user_SQL = "SELECT * FROM users WHERE userId = ?";

  // One user
  public async getOneUser(id: number): Promise<UserModel> {
    const sql = this.SELECT_ONE_user_SQL;
    const user = await dal.execute(sql, [id]);
    return user;
  }
}

const userService = new UserService();
export default userService;
