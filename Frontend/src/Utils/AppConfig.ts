class AppConfig {
  public readonly baseUrl: string;

  public readonly allVacationsUrl: string;

  public readonly loginUserUrl: string;

  public readonly registerUserUrl: string;

  public readonly vacationActionsUrl: string;

  public readonly addVacationUrl: string;

  public readonly addMultipleVacationUrl: string;

  public readonly updateUserUrl: string;

  public readonly userImageUrl: string;

  public readonly followActionsVacationUrl: string;

  public readonly reportsUrl: string;

  public readonly sendVerificationEmailUrl: string;

  public readonly verifyCodeUrl: string;

  public readonly setNewPasswordUrl: string;

  public readonly askGpt: string;

  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.allVacationsUrl = `${this.baseUrl}/api/vacations/subscriptions/`;
    this.loginUserUrl = `${this.baseUrl}/api/auth/login`;
    this.registerUserUrl = `${this.baseUrl}/api/auth/register`;
    this.vacationActionsUrl = `${this.baseUrl}/api/vacations/`;
    this.addVacationUrl = `${this.baseUrl}/api/add-vacation/`;
    this.addMultipleVacationUrl = `${this.baseUrl}/api/add-multiple-vacation/`;
    this.updateUserUrl = `${this.baseUrl}/api/user/`;
    this.userImageUrl = `${this.baseUrl}/api/user/image/`;
    this.followActionsVacationUrl = `${this.baseUrl}/api/follow`;
    this.reportsUrl = `${this.baseUrl}/api/vacation-reports/`;
    this.sendVerificationEmailUrl = `${this.baseUrl}/api/password-recovery/`;
    this.verifyCodeUrl = `${this.baseUrl}/api/verify-code/`;
    this.setNewPasswordUrl = `${this.baseUrl}/api/update-password/`;
    this.askGpt = `${this.baseUrl}/api/ask-gpt/`;
  }
}

class DevelopmentConfig extends AppConfig {
  public constructor() {
    super("http://localhost:4000");
  }
}

class ProductionConfig extends AppConfig {
  public constructor() {
    super("http://104.248.12.109:4000");
  }
}

const appConfig = new ProductionConfig();
// const appConfig = new DevelopmentConfig();

export default appConfig;
