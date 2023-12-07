import Joi from "joi";
import { ValidationError } from "./error-models";

export default class CredentialModel {
  public userEmail: string;
  public userPassword: string;

  public constructor(credentials: CredentialModel) {
    this.userEmail = credentials.userEmail;
    this.userPassword = credentials.userPassword;
  }

  private static validationSchema = Joi.object({
    userEmail: Joi.string().email().required().min(2).max(50),
    password: Joi.string()
      .required()
      .min(6)
      .max(20)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/),
  });

  public validation(): void {
    const result = CredentialModel.validationSchema.validate(this);
    if (result?.error?.message) throw new ValidationError(result.error.message);
  }
}

