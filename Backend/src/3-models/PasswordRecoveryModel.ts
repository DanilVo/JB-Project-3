import Joi from "joi";
import { ValidationError } from "./error-models";

export default class PasswordRecoveryModel {
  public email: string;
  public password: string;
  public verifyPassword: string;

  public constructor(userObject: PasswordRecoveryModel) {
    this.email = userObject.email;
    this.password = userObject.password;
    this.verifyPassword = userObject.verifyPassword;
  }

  private static validationSchema = Joi.object({
    password: Joi.string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/),
    verifyPassword: Joi.string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/),
    email: Joi.string().email().required().min(2).max(50),
  });

  public passwordValidation(): void {
    const result = PasswordRecoveryModel.validationSchema.validate(this);
    if (result?.error?.message) throw new ValidationError(result.error.message);
  }
}
