import Joi from "joi";
import { ValidationError } from "./error-models";

export default class CredentialModel {
  public email: string;
  public password: string;

  public constructor(credentials: CredentialModel) {
    this.email = credentials.email;
    this.password = credentials.password;
  }

  private static validationSchema = Joi.object({
    email: Joi.string().email().required().min(2).max(50),
    password: Joi.string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/),
  });

  public validation(): void {
    const result = CredentialModel.validationSchema.validate(this);
    if (result?.error?.message) throw new ValidationError(result.error.message);
  }
}