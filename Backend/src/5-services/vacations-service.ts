import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/error-models";
import VacationModel from "../3-models/vacation-model";
import appConfig from "../2-utils/app-config";
import { fileSaver } from "uploaded-file-saver";
import UserModel from "../3-models/user-model";

class VacationService {
  private readonly SELECT_EXISTING_IMAGE_NAME =
    "SELECT vacationImageUrl FROM vacations WHERE vacationId = ?";
  private readonly SELECT_ALL_vacationS_SQL = `SELECT *, CONCAT('${appConfig.appHost}','/api/vacations/',vacationImageUrl) AS vacationImageUrl
                                               FROM vacations 
                                               ORDER BY vacationStartDate ASC`;
  private readonly SELECT_ONE_vacation_SQL =
    "SELECT * FROM vacations WHERE vacationId = ?";
  private readonly INSERT_vacation_SQL = `
    INSERT INTO vacations(destination,description,vacationStartDate,vacationEndDate,price,vacationImageUrl)
    VALUES(?,?,?,?,?,?)`;
  private readonly UPDATE_vacation_SQL = `
    UPDATE vacations
    SET destination=?, description=?, vacationStartDate=?, vacationEndDate=?, price=?, vacationImageUrl=?
    WHERE vacationId = ?`;
  private readonly DELETE_vacation_SQL =
    "DELETE FROM vacations WHERE vacationId = ?";
  private readonly GET_following_vacations = `
        SELECT DISTINCT
        V.*,
        EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
        COUNT(F.userId) AS followersCount
        FROM vacations as V LEFT JOIN followers as F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ORDER BY startDate`;

  private async getExistingImageName(id: number): Promise<string> {
    const sql = this.SELECT_EXISTING_IMAGE_NAME;
    const vacations = await dal.execute(sql, [id]);
    const vacation = vacations[0];
    if (!vacation) return "";
    return vacation.vacationImageUrl;
  }

  public async getVacations(userId: number): Promise<VacationModel[]> {
    const sql = this.GET_following_vacations;

    const vacations = await dal.execute(sql, [userId]);

    return vacations;
  }

  // All vacations
  public async getAllVacations(): Promise<VacationModel[]> {
    const sql = this.SELECT_ALL_vacationS_SQL;
    const vacations = await dal.execute(sql);
    return vacations;
  }

  // One vacation
  public async getOneVacation(id: number): Promise<VacationModel> {
    const sql = this.SELECT_ONE_vacation_SQL;
    const vacation = await dal.execute(sql, [id]);
    return vacation;
  }



  // Add vacation
  public async addVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validation();
    const imageName = await fileSaver.add(vacation.image);
    const sql = this.INSERT_vacation_SQL;
    const info: OkPacket = await dal.execute(sql, [
      vacation.destination,
      vacation.description,
      String(vacation.vacationStartDate),
      String(vacation.vacationEndDate),
      vacation.price,
      imageName,
    ]);
    vacation.vacationId = info.insertId;
    delete vacation.image;
    vacation.vacationImageUrl = `${appConfig.appHost}/api/vacations/${imageName}`;
    return vacation;
  }

  // Update vacation
  public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validation();
    const existingImageName = await this.getExistingImageName(
      vacation.vacationId
    );
    const imageName = vacation.image
      ? await fileSaver.update(existingImageName, vacation.image)
      : existingImageName;
    const sql = this.UPDATE_vacation_SQL;
    const info: OkPacket = await dal.execute(sql, [
      vacation.destination,
      vacation.description,
      String(vacation.vacationStartDate),
      String(vacation.vacationEndDate),
      vacation.price,
      imageName,
      vacation.vacationId,
    ]);
    if (info.affectedRows === 0)
      throw new ResourceNotFoundError(vacation.vacationId);
    delete vacation.image;
    vacation.vacationImageUrl = `${appConfig.appHost}/api/vacations/${imageName}`;
    return vacation;
  }

  // Delete vacation
  public async deleteVacation(id: number): Promise<void> {
    const sql = this.DELETE_vacation_SQL;
    const info: OkPacket = await dal.execute(sql, [id]);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
  }
}

const vacationService = new VacationService();

export default vacationService;
