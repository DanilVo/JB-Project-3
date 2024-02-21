import Joi from "joi";
import RoleModel from "./role-model";
import { ValidationError } from "./error-models";
import { UploadedFile } from "express-fileupload";

export default class UserModel {
  public userId: number;
  public userUuid: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roleId: RoleModel;
  public userImageUrl: string;
  public image: UploadedFile;

  public constructor(user: UserModel) {
    this.userId = user.userId;
    this.userUuid = user.userUuid;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId;
    this.userImageUrl = user.userImageUrl;
    this.image = user.image;
  }

  private static userValidationSchema = Joi.object({
    userId: Joi.number().optional().integer().positive(),
    userUuid: Joi.any().optional(),
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required().min(2).max(50),
    password: Joi.string()
      .optional()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]?).{4,}$/),
    roleId: Joi.number().optional(),
    userImageUrl: Joi.string().optional(),
    image: Joi.object().optional(),
  });

  public userValidation(): void {
    const result = UserModel.userValidationSchema.validate(this);
    if (result?.error?.message) throw new ValidationError(result.error.message);
    if (this.image && this.image.size > 1000000)
      throw new ValidationError("Image to large");
  }
}
