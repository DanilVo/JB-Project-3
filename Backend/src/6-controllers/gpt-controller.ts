import express, { NextFunction, Request, Response } from 'express';
import gptService from '../5-services/gpt-service';

const router = express.Router();

router.post(
  '/ask-gpt/',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const req = request.body;
      const res = await gptService.askGpt(req.prompt);
      const gptAnswer = res.choices[0].message.content;
      response.json(gptAnswer);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
