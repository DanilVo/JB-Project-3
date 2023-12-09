import { UploadedFile } from 'express-fileupload';
import Joi from 'joi';
import { ValidationError } from './error-models';

export default class VacationModel {
  public vacationId: number;
  public destination: string;
  public description: string;
  public vacationStartDate: Date;
  public vacationEndDate: Date;
  public price: number;
  public vacationImageUrl: string;
  public image: UploadedFile;

  public constructor(vacation: VacationModel) {
    this.vacationId = vacation.vacationId;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.vacationStartDate = vacation.vacationStartDate;
    this.vacationEndDate = vacation.vacationEndDate;
    this.price = vacation.price;
    this.vacationImageUrl = vacation.vacationImageUrl;
    this.image = vacation.image;
  }

  private static validationSchema = Joi.object({
    vacationId: Joi.number().optional().integer().positive(),
    destination: Joi.string().required().min(10).max(25),
    description: Joi.string().required().min(10).max(75),
    vacationStartDate: Joi.date().required(),
    vacationEndDate: Joi.date()
      .required()
      .greater(Joi.ref('vacationStartDate')),
    price: Joi.number().required().min(0).max(10000).positive(),
    vacationImageUrl: Joi.string().optional(),
    image: Joi.object().optional(),
  });

  public validation(): void {
    const result = VacationModel.validationSchema.validate(this);
    if (result?.error?.message) throw new ValidationError(result.error.message);
    if (this.image && this.image.size > 100000)
      throw new ValidationError('Image to large');
  }
}
