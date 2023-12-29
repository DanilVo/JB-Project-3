import Joi from "joi";
import RoleModel from "./role-model";
import { ValidationError } from "./error-models";

export default class UserModel {
  public userId: number;
  public userUuid: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roleId: RoleModel;

  public constructor(user: UserModel) {
    this.userId = user.userId;
    this.userUuid = user.userUuid;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId;
  }

  private static userValidationSchemaAdd = Joi.object({
    userId: Joi.number().forbidden().integer().positive(),
    userUuid: Joi.any().optional(),
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required().min(2).max(50),
    password: Joi.string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/),
    roleId: Joi.number().forbidden(),
  });

  private static userValidationSchemaUpdate = Joi.object({
    userId: Joi.number().forbidden().integer().positive(),
    userUuid: Joi.any().forbidden(),
    firstName: Joi.string().optional().min(2).max(50),
    lastName: Joi.string().optional().min(2).max(50),
    email: Joi.string().email().optional().min(2).max(50),
    password: Joi.string()
      .optional()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,}$/),
    roleId: Joi.number().forbidden(),
  });

  public userValidationAdd(): void {
    const result = UserModel.userValidationSchemaAdd.validate(this);
    if (result?.error?.message) throw new ValidationError(result.error.message);
  }

  public userValidationUpdate(): void {
    const result = UserModel.userValidationSchemaUpdate.validate(this);
    if (result?.error?.message) throw new ValidationError(result.error.message);
  }
}
