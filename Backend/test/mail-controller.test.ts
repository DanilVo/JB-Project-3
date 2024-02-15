import { expect } from 'chai';
import { describe, it } from 'mocha';
import supertest from 'supertest';
import app from '../src/app';

describe('Testing Password Recovery Endpoint:', () => {
  it('should return 404 for non-existent email', async () => {
    const email = 'nonexistent@example.com';
    const response = await supertest(app.server).get(
      `/password-recovery/${email}`
    );
    expect(response.status).to.equal(404); 
  });
});
