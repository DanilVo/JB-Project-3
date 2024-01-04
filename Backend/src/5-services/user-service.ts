import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import UserModel from "../3-models/user-model";
import { ResourceNotFoundError } from "../3-models/error-models";
import path from "path";

class UserService {
  // private readonly SELECT_EXISTING_IMAGE_NAME =
  //   "SELECT vacationImageUrl FROM vacations WHERE vacationId = ?";
  private readonly SELECT_ONE_user_SQL =
    "SELECT * FROM users WHERE userUuid = ?";
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
    // user.validationUpdate();
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

  public generateReport() {
    const createCsvWriter = require("csv-writer").createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: path.join(__dirname, "../1-assets", "/reports/reports.csv"),
      header: [
        { id: "name", title: "NAME" },
        { id: "lang", title: "LANGUAGE" },
      ],
    });

    const records = [
      { name: "Bob", lang: "French, English" },
      { name: "Mary", lang: "English" },
      { name: "Mary", lang: "English" },
    ];

    csvWriter
      .writeRecords(records) // returns a promise
      .then(() => {
        console.log("...Done");
      });
    // return path.join(__dirname,'../1-assets','/reports')
  }
}

const userService = new UserService();
export default userService;
