class AppConfig {
  public readonly baseUrl: string = 'http://localhost:4000/';

  public readonly allVacationsUrl: string = `${this.baseUrl}api/vacations`;

  public readonly loginUrl: string = `${this.baseUrl}api/auth/login`;

  public readonly registerUrl: string = `${this.baseUrl}api/auth/register`;
}

// Singleton
const appConfig = new AppConfig();

export default appConfig;
