import dotenv from "dotenv";
dotenv.config();

class AppConfig {
  public port = process.env.PORT;
  public host = process.env.MYSQL_HOST;
  public user = process.env.MYSQL_USER;
  public password = process.env.MYSQL_PASSWORD;
  public database = process.env.MYSQL_DATABASE;

  public readonly appHost = `http://104.248.12.109:${process.env.PORT}`;
}

class DevelopmentConfig extends AppConfig {
  public isDevelopment = true;
  public isProduction = false;
}

class ProductionConfig extends AppConfig {
  public isDevelopment = false;
  public isProduction = true;
}

const appConfig =
  process.env.NODE_ENV === "production"
    ? new ProductionConfig()
    : new DevelopmentConfig();

export default appConfig;
