import express, { NextFunction, Request, Response } from 'express';
import gptService from '../5-services/gpt-service';
import { ValidationError } from '../3-models/error-models';

const router = express.Router();

router.post(
  '/ask-gpt/',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const req = request.body;
      if (!req) throw new ValidationError('Prompt was not provided')
      const res = await gptService.askGpt(req.prompt);
      const gptAnswer = res.choices[0].message.content;
      response.json(gptAnswer);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
