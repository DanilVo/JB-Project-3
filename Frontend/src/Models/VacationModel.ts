export default class VacationModel {
  public vacationId: number;
  public vacationUuid: string;
  public destination: string;
  public description: string;
  public followersCount: number;
  public isFollowing: number;
  public vacationStartDate: Date | string;
  public vacationEndDate: Date | string;
  public price: number;
  public vacationImageUrl: string;
  public image: File;
}
