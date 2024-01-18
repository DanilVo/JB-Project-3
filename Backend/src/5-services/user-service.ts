import { OkPacket } from "mysql";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import appConfig from "../2-utils/app-config";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import {
  ResourceNotFoundError
} from "../3-models/error-models";
import UserModel from "../3-models/user-model";
import VacationModel from "../3-models/vacation-model";
import vacationService from "./vacations-service";

class UserService {
  private readonly SELECT_EXISTING_IMAGE_NAME =
    "SELECT userImageUrl FROM users WHERE userId = ?";
  private readonly SELECT_ONE_user_SQL = "SELECT * FROM users WHERE userId = ?";
  private readonly UPDATE_user_SQL = `
    UPDATE users
    SET firstName=?, lastName=?, email=?, userImageUrl = ?
    WHERE userId = ?`;

  // One user
  public async getOneUser(id: number): Promise<UserModel> {
    const sql = this.SELECT_ONE_user_SQL;
    const user = await dal.execute(sql, [id]);
    return user;
  }

  // UpdateUser
  public async updateUser(user: UserModel): Promise<string> {
    user.userValidation();
    const existingImageName = await this.getExistingImageName(user.userId);
    const imageName = user.image
      ? await fileSaver.update(
          existingImageName,
          user.image,
          path.join(__dirname, "..", "1-assets", "user-images")
        )
      : existingImageName;
    const sql = this.UPDATE_user_SQL;
    const info: OkPacket = await dal.execute(sql, [
      user.firstName,
      user.lastName,
      user.email,
      imageName,
      user.userId,
    ]);
    if (info.affectedRows === 0) throw new ResourceNotFoundError();
    const token = cyber.getNewToken(user);
    delete user.image;
    user.userImageUrl = `${appConfig.appHost}/api/vacations/${imageName}`;
    return token;
  }

  private async getExistingImageName(id: number): Promise<string> {
    const sql = this.SELECT_EXISTING_IMAGE_NAME;
    const vacations = await dal.execute(sql, [id]);
    const vacation = vacations[0];
    if (!vacation) return "";
    return vacation.vacationImageUrl;
  }

  public async generateReport(userId: number) {
    const vacations: VacationModel[] = await vacationService.getVacations(
      userId
    );

    const createCsvWriter = require("csv-writer").createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: path.join(__dirname, "../1-assets", `/reports/reports.csv`),
      header: [
        { id: "dest", title: "Destination" },
        { id: "follow", title: "Followers" },
      ],
    });

    const records = vacations.map((v) => ({
      dest: v.destination,
      follow: v.followersCount,
    }));

    await csvWriter.writeRecords(records).then(() => {
      console.log("created csv");
    });

    return true;
  }
}

const userService = new UserService();
export default userService;
