class AppConfig {
  public readonly baseUrl: string = 'http://localhost:4000/';

  public readonly allVacationsUrl: string = `${this.baseUrl}api/vacations/subscriptions/`;

  public readonly loginUserUrl: string = `${this.baseUrl}api/auth/login`;

  public readonly registerUserUrl: string = `${this.baseUrl}api/auth/register`;

  public readonly deleteVacationUrl: string = `${this.baseUrl}api/vacations/`;

  public readonly updateVacationUrl: string = `${this.baseUrl}api/vacations/`;

  public readonly updateUserUrl: string = `${this.baseUrl}api/user/`;

  public readonly followVacationUrl: string = `${this.baseUrl}api/follow`;
}

// Singleton
const appConfig = new AppConfig();

export default appConfig;
