class AppConfig {
  public readonly baseUrl: string = "http://localhost:4000/";

  public readonly allVacationsUrl: string = `${this.baseUrl}api/vacations/subscriptions/`;

  public readonly loginUserUrl: string = `${this.baseUrl}api/auth/login`;

  public readonly registerUserUrl: string = `${this.baseUrl}api/auth/register`;

  public readonly vacationActionsUrl: string = `${this.baseUrl}api/vacations/`;

  public readonly addVacationUrl: string = `${this.baseUrl}api/add-vacation/`;

  public readonly updateUserUrl: string = `${this.baseUrl}api/user/`;

  public readonly userImageUrl: string = `${this.baseUrl}api/user/image/`;

  public readonly followActionsVacationUrl: string = `${this.baseUrl}api/follow`;

  public readonly reportsUrl: string = `${this.baseUrl}api/vacation-reports/`;

  public readonly sendVerificationEmailUrl: string = `${this.baseUrl}api/password-recovery/`;

  public readonly verifyCodeUrl: string = `${this.baseUrl}api/verify-code/`;

  public readonly setNewPasswordUrl: string = `${this.baseUrl}api/update-password/`;
}

// Singleton
const appConfig = new AppConfig();

export default appConfig;
