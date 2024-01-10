class UserModel {
  public userId: number;
  public uuid: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roleId: number;
  public userImageUrl: string;
  public image: File;
}

export default UserModel;
