import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import UserModel from "../3-models/user-model";
import { ResourceNotFoundError } from "../3-models/error-models";

class UserService {
  // private readonly SELECT_EXISTING_IMAGE_NAME =
  //   "SELECT vacationImageUrl FROM vacations WHERE vacationId = ?";
  private readonly SELECT_ONE_user_SQL = "SELECT * FROM users WHERE userUuid = ?";
  private readonly UPDATE_user_SQL = `
    UPDATE users
    SET firstName=?, lastName=?, email=?
    WHERE userUuid = ?`;

  // One user
  public async getOneUser(id: number): Promise<UserModel> {
    const sql = this.SELECT_ONE_user_SQL;
    const user = await dal.execute(sql, [id]);
    return user;
  }

  // UpdateUser
  public async updateUser(user: UserModel): Promise<UserModel> {
    user.userValidationUpdate();
    // const existingImageName = await this.getExistingImageName(
    //   vacation.vacationId
    // );
    // const imageName = vacation.image
    //   ? await fileSaver.update(existingImageName, vacation.image)
    //   : existingImageName;
    const sql = this.UPDATE_user_SQL;
    const info: OkPacket = await dal.execute(sql, [
      user.firstName,
      user.lastName,
      user.email,
      user.userUuid,
    ]);
    if (info.affectedRows === 0) throw new ResourceNotFoundError();
    // delete vacation.image;
    // vacation.vacationImageUrl = `${appConfig.appHost}/api/vacations/${imageName}`;
    return user;
  }

  // private async getExistingImageName(id: number): Promise<string> {
  //   const sql = this.SELECT_EXISTING_IMAGE_NAME;
  //   const vacations = await dal.execute(sql, [id]);
  //   const vacation = vacations[0];
  //   if (!vacation) return "";
  //   return vacation.vacationImageUrl;
  // }
}

const userService = new UserService();
export default userService;
