import { OkPacket } from 'mysql';
import dal from '../2-utils/dal';
import { ResourceNotFoundError } from '../3-models/error-models';
import VocationModel from '../3-models/vocation-model';
import appConfig from '../2-utils/app-config';
import { fileSaver } from 'uploaded-file-saver';

class VocationService {
  private readonly SELECT_EXISTING_IMAGE_NAME =
    'SELECT vocationImageUrl FROM vocations WHERE vocationId = ?';
  private readonly SELECT_ALL_VOCATIONS_SQL = 'SELECT * FROM vocations';
  private readonly SELECT_ONE_VOCATION_SQL =
    'SELECT * FROM vocations WHERE vocationId = ?';
  private readonly INSERT_VOCATION_SQL = `
    INSERT INTO vocations(destination,description,vocationStartDate,vocationEndDate,price,vocationImageUrl)
    VALUES(?,?,?,?,?,?)`;
  private readonly UPDATE_VOCATION_SQL = `
    UPDATE vocations
    SET destination=?, description=?, vocationStartDate=?, vocationEndDate=?, price=?, vocationImageUrl=?
    WHERE vocationId = ?`;
  private readonly DELETE_VOCATION_SQL =
    'DELETE FROM vocations WHERE vocationId = ?';

  private async getExistingImageName(id: number): Promise<string> {
    const sql = this.SELECT_EXISTING_IMAGE_NAME;
    const vocations = await dal.execute(sql, [id]);
    const vocation = vocations[0];
    if (!vocation) return '';
    return vocation.vocationImageUrl;
  }

  // All vocations
  public async getAllVocations(): Promise<VocationModel[]> {
    const sql = this.SELECT_ALL_VOCATIONS_SQL;
    const vocations = await dal.execute(sql);
    return vocations;
  }

  // One vocation
  public async getOneVocation(id: number): Promise<VocationModel> {
    const sql = this.SELECT_ONE_VOCATION_SQL;
    const vocations = await dal.execute(sql, [id]);
    return vocations;
  }

  // Add vocation
  public async addVocation(vocation: VocationModel): Promise<VocationModel> {
    vocation.validation();
    const imageName = await fileSaver.add(vocation.image);
    const sql = this.INSERT_VOCATION_SQL;
    const info: OkPacket = await dal.execute(sql, [
      vocation.destination,
      vocation.description,
      String(vocation.vocationStartDate),
      String(vocation.vocationEndDate),
      vocation.price,
      imageName,
    ]);
    vocation.vocationId = info.insertId;
    delete vocation.image;
    vocation.vocationImageUrl = `${appConfig.appHost}/api/vocations/${imageName}`;
    return vocation;
  }

  // Update vocation
  public async updateVocation(vocation: VocationModel): Promise<VocationModel> {
    vocation.validation();
    const existingImageName = await this.getExistingImageName(
      vocation.vocationId
    );
    const imageName = vocation.image
      ? await fileSaver.update(existingImageName, vocation.image)
      : existingImageName;
    const sql = this.UPDATE_VOCATION_SQL;
    const info: OkPacket = await dal.execute(sql, [
      vocation.destination,
      vocation.description,
      String(vocation.vocationStartDate),
      String(vocation.vocationEndDate),
      vocation.price,
      imageName,
      vocation.vocationId,
    ]);
    if (info.affectedRows === 0)
      throw new ResourceNotFoundError(vocation.vocationId);
    delete vocation.image;
    vocation.vocationImageUrl = `${appConfig.appHost}/api/vocations/${imageName}`;
    return vocation;
  }

  // Delete vocation
  public async deleteVocation(id: number): Promise<void> {
    const sql = this.DELETE_VOCATION_SQL;
    const info: OkPacket = await dal.execute(sql, [id]);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
  }
}

const vocationService = new VocationService();

export default vocationService;
