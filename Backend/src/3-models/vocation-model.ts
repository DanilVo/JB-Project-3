import { UploadedFile } from 'express-fileupload';
import Joi from 'joi';
import { ValidationError } from './error-models';

export default class VocationModel {
  public vocationId: number;
  public destination: string;
  public description: string;
  public vocationStartDate: Date;
  public vocationEndDate: Date;
  public price: number;
  public vocationImageUrl: string;
  public image: UploadedFile;

  public constructor(vocation: VocationModel) {
    this.vocationId = vocation.vocationId;
    this.destination = vocation.destination;
    this.description = vocation.description;
    this.vocationStartDate = vocation.vocationStartDate;
    this.vocationEndDate = vocation.vocationEndDate;
    this.price = vocation.price;
    this.vocationImageUrl = vocation.vocationImageUrl;
    this.image = vocation.image;
  }

  private static validationSchema = Joi.object({
    vocationId: Joi.number().optional().integer().positive(),
    destination: Joi.string().required().min(10).max(25),
    description: Joi.string().required().min(10).max(75),
    vocationStartDate: Joi.date().required(),
    vocationEndDate: Joi.date()
      .required()
      .greater(Joi.ref('vocationStartDate')),
    price: Joi.number().required().min(0).max(10000).positive(),
    vocationImageUrl: Joi.string().optional(),
    image: Joi.object().optional(),
  });

  public validation(): void {
    const result = VocationModel.validationSchema.validate(this);
    if (result?.error?.message) throw new ValidationError(result.error.message);
    if (this.image.size > 100000) throw new ValidationError('Image to large');
  }
}
