import { OkPacket } from "mysql";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import appConfig from "../2-utils/app-config";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/error-models";
import VacationModel from "../3-models/vacation-model";

interface VacationInfo {
  userId: number;
  vacationId: number;
}

class VacationService {
  private readonly SELECT_EXISTING_IMAGE_NAME =
    "SELECT vacationImageUrl FROM vacations WHERE vacationId = ?";
  private readonly SELECT_ONE_vacation_SQL =
    "SELECT * FROM vacations WHERE vacationId = ?";
  private readonly INSERT_vacation_SQL = `
    INSERT INTO vacations(vacationUuid,destination,description,vacationStartDate,vacationEndDate,price,vacationImageUrl)
    VALUES(?,?,?,?,?,?,?)`;
  private readonly UPDATE_vacation_SQL = `
    UPDATE vacations
    SET vacationUuid=?, destination=?, description=?, vacationStartDate=?, vacationEndDate=?, price=?, vacationImageUrl=?
    WHERE vacationId = ?`;
  private readonly DELETE_vacation_SQL =
    "DELETE FROM vacations WHERE vacationId = ?";
  private readonly GET_following_vacations = `
        SELECT DISTINCT
        V.*,CONCAT('${appConfig.appHost}','/api/vacations/image/',vacationImageUrl) AS vacationImageUrl,
        EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
        COUNT(F.userId) AS followersCount
        FROM vacations as V LEFT JOIN followers as F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ORDER BY vacationStartDate`;
  private readonly FOLLOW_VACATION =
    "INSERT INTO followers (userId, vacationId) VALUES (?, ?)";
  private readonly UNFOLLOW_VACATION =
    "DELETE FROM followers WHERE followers.userId = ? AND followers.vacationId = ?";

  private async getExistingImageName(id: number): Promise<string> {
    const sql = this.SELECT_EXISTING_IMAGE_NAME;
    const vacations = await dal.execute(sql, [id]);
    const vacation = vacations[0];
    if (!vacation) return "";
    return vacation.vacationImageUrl;
  }

  // Get all vacations
  public async getVacations(userId: number): Promise<VacationModel[]> {
    const sql = this.GET_following_vacations;
    const vacations = await dal.execute(sql, [userId]);
    return vacations;
  }

  // Add vacation
  public async addVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.vacationUuid = cyber.hashPassword(
      vacation.description + vacation.destination
    );
    vacation.validation();
    const imageName = await fileSaver.add(
      vacation.image,
      path.join(__dirname, "..", "1-assets", "vacationImages")
    );
    const sql = this.INSERT_vacation_SQL;

    const info: OkPacket = await dal.execute(sql, [
      vacation.vacationUuid,
      vacation.destination,
      vacation.description,
      String(vacation.vacationStartDate),
      String(vacation.vacationEndDate),
      vacation.price,
      imageName,
    ]);
    vacation.vacationId = +info.insertId;
    delete vacation.image;
    vacation.vacationImageUrl = `${appConfig.appHost}/api/vacations/image/${imageName}`;
    return vacation;
  }

  // Update vacation
  public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validation();
    const existingImageName = await this.getExistingImageName(
      vacation.vacationId
    );

    const imageName = vacation.image
      ? await fileSaver.update(
          existingImageName,
          vacation.image,
          path.join(__dirname, "..", "1-assets", "vacationImages")
        )
      : existingImageName;
    const sql = this.UPDATE_vacation_SQL;
    const info: OkPacket = await dal.execute(sql, [
      vacation.vacationUuid,
      vacation.destination,
      vacation.description,
      String(vacation.vacationStartDate),
      String(vacation.vacationEndDate),
      vacation.price,
      imageName,
      +vacation.vacationId,
    ]);
    if (info.affectedRows === 0) throw new ResourceNotFoundError();
    delete vacation.image;
    vacation.vacationId = +vacation.vacationId;
    vacation.vacationImageUrl = `${appConfig.appHost}/api/vacations/image/${imageName}`;
    return vacation;
  }

  // Delete vacation
  public async deleteVacation(id: number): Promise<void> {
    const sql = this.DELETE_vacation_SQL;
    const imageToDelete = await this.getExistingImageName(id)
    await fileSaver.delete(
      imageToDelete,
      path.join(__dirname, "..", "1-assets", "vacationImages")
    );
    const info: OkPacket = await dal.execute(sql, [id]);
    
    // await fileSaver.delete(imageToDelete)
    if (info.affectedRows === 0) throw new ResourceNotFoundError();
  }

  public async followVacation(props: VacationInfo): Promise<void> {
    const sql = this.FOLLOW_VACATION;
    await dal.execute(sql, [props.userId, props.vacationId]);
  }

  public async unFollowVacation(props: VacationInfo): Promise<void> {
    const sql = this.UNFOLLOW_VACATION;
    await dal.execute(sql, [props.userId, props.vacationId]);
  }
}

const vacationService = new VacationService();

export default vacationService;
