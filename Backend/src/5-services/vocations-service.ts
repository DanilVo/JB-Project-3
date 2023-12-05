import dal from "../2-utils/dal";

class VocationService {
  public async getAllVocations() {
    const sql = `SELECT * FROM vocations`;
    const vocations = await dal.execute(sql)
    return vocations
  }
}

const vocationService = new VocationService();

export default vocationService;
