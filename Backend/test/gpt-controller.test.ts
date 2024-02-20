import { expect } from 'chai';
import { describe, it } from 'mocha';
import supertest from 'supertest';
import app from '../src/app';

describe('Testing GPT endpoint:', () => {
  it('should return GPT response for valid prompt', async () => {
    const prompt = 'What is the capital of France?';
    const response = await supertest(app.server)
      .post('/api/ask-gpt/')
      .send(prompt);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.a('string'); 
  });

  it('should throw an error for missing prompt', async () => {
    const response = await supertest(app.server)
      .post('/api/ask-gpt/')
      .send({});
    expect(response.status).to.equal(400);
  });
});
