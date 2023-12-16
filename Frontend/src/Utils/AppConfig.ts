class AppConfig {
  public readonly baseUrl: string = "http://localhost:4000/";

  public readonly allVacations: string = `${this.baseUrl}api/vacations`
}

// Singleton
const appConfig = new AppConfig();

export default appConfig;
