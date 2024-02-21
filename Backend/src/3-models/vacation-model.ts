import { UploadedFile } from 'express-fileupload';
import Joi from 'joi';
import { ValidationError } from './error-models';

export default class VacationModel {
  public vacationId: number;
  public vacationUuid: string;
  public destination: string;
  public description: string;
  public vacationStartDate: Date;
  public vacationEndDate: Date;
  public price: number;
  public followersCount: number;
  public isFollowing: number;
  public vacationImageUrl: string;
  public image: UploadedFile;

  public constructor(vacation: VacationModel) {
    this.vacationId = vacation.vacationId;
    this.vacationUuid = vacation.vacationUuid;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.vacationStartDate = vacation.vacationStartDate;
    this.vacationEndDate = vacation.vacationEndDate;
    this.price = vacation.price;
    this.followersCount = vacation.followersCount;
    this.isFollowing = vacation.isFollowing;
    this.vacationImageUrl = vacation.vacationImageUrl;
    this.image = vacation.image;
  }

  private static validationSchema = Joi.object({
    vacationId: Joi.number().optional().integer().positive(),
    vacationUuid: Joi.any().optional(),
    destination: Joi.string().required().min(2).max(25),
    description: Joi.string().required().min(5).max(75),
    vacationStartDate: Joi.date()
      .required()
      .greater(Date.now() - 12 * 60 * 60 * 1000),
    vacationEndDate: Joi.date()
      .required()
      .greater(Joi.ref("vacationStartDate")),
    price: Joi.number().required().min(0).max(10000).positive(),
    followersCount: Joi.number().optional().min(0),
    isFollowing: Joi.number().optional().min(0),
    vacationImageUrl: Joi.string().optional(),
    image: Joi.object().optional(),
  });

  private static updateValidationSchema = Joi.object({
    vacationId: Joi.number().optional().integer().positive(),
    vacationUuid: Joi.any().optional(),
    destination: Joi.string().required().min(2).max(25),
    description: Joi.string().required().min(5).max(75),
    vacationStartDate: Joi.date().required(),
    vacationEndDate: Joi.date()
      .required()
      .greater(Joi.ref("vacationStartDate")),
    price: Joi.number().required().min(0).max(10000).positive(),
    followersCount: Joi.number().optional().min(0),
    isFollowing: Joi.number().optional().min(0),
    vacationImageUrl: Joi.string().optional(),
    image: Joi.object().optional(),
  });

  public validation(): void {
    const result = VacationModel.validationSchema.validate(this);
    if (result?.error?.message) throw new ValidationError(result.error.message);
    if (this.image && this.image.size > 1000000)
      throw new ValidationError("Image to large");
  }

  public updateValidation(): void {
    const result = VacationModel.validationSchema.validate(this);
    if (result?.error?.message) throw new ValidationError(result.error.message);
    if (this.image && this.image.size > 1000000)
      throw new ValidationError("Image to large");
  }
}
