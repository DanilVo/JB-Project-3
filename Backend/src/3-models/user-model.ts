import Joi from 'joi';
import RoleModel from './role-model';
import { ValidationError } from './error-models';

export default class UserModel {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public role: RoleModel;

  public constructor(user: UserModel) {
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.password = user.password;
    this.role = user.role;
  }

  private static validationSchema = Joi.object({
    id: Joi.number().optional().integer().positive(),
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required().min(2).max(50),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/)
      .required()
      .min(2)
      .max(50),
    roleId: Joi.number().optional().min(1).max(2).positive(),
  });

  public validation(): void {
    const result = UserModel.validationSchema.validate(this);
    if (result?.error?.message) throw new ValidationError(result.error.message);
  }
}
