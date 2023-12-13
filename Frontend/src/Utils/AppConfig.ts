class AppConfig {
  public readonly baseUrl: string = "http://localhost:4000/";
}

// Singleton
const appConfig = new AppConfig();

export default appConfig;
