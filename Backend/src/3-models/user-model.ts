import Joi from "joi";
import RoleModel from "./role-model";
import { ValidationError } from "./error-models";

export default class UserModel {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roleId: RoleModel;

  public constructor(user: UserModel) {
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId;
  }

  private static validationSchemaAdd = Joi.object({
    userId: Joi.number().optional().integer().positive(),
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required().min(2).max(50),
    password: Joi.string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/),
    roleId: Joi.number().forbidden(),
  });

  private static validationSchemaUpdate = Joi.object({
    userId: Joi.number().optional().integer().positive(),
    firstName: Joi.string().optional().min(2).max(50),
    lastName: Joi.string().optional().min(2).max(50),
    email: Joi.string().email().optional().min(2).max(50),
    password: Joi.string()
      .optional()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/),
    roleId: Joi.number().forbidden(),
  });

  public validationAdd(): void {
    const result = UserModel.validationSchemaAdd.validate(this);
    if (result?.error?.message) throw new ValidationError(result.error.message);
  }

  public validationUpdate(): void {
    const result = UserModel.validationSchemaUpdate.validate(this);
    if (result?.error?.message) throw new ValidationError(result.error.message);
  }
}
