class AppConfig {
    public readonly dataUrl: string = "http://localhost:4000/api/____/";
}

// Singleton
const appConfig = new AppConfig();

export default appConfig;