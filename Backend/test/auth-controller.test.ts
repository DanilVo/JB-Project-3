import { expect } from 'chai';
import { describe, it } from 'mocha';
import supertest from 'supertest';
import app from '../src/app';

describe('Testing auth controller endpoint:', () => {
  it('should login with existing credentials ', async () => {
    const response = await supertest(app.server).post('/api/auth/login').send({
      email: 'admin@admin.com',
      password: 'Admin1234',
    });
    const token = response.body;
    expect(response.status).to.equals(200);
    expect(token).to.have.length.gte(100).and.lte(600);
  });

  it('should not login with invalid email syntax', async () => {
    const response = await supertest(app.server).post('/api/auth/login').send({
      email: 'notValidEmail.com',
      password: 'notValidPassword1234',
    });
    expect(response.status).to.equals(422);
  });

  it('should not login with invalid email ', async () => {
    const response = await supertest(app.server).post('/api/auth/login').send({
      email: 'notValidEmail@email.com',
      password: 'notValidPassword1234',
    });
    expect(response.status).to.equals(401);
  });

  it('should not login with invalid password ', async () => {
    const response = await supertest(app.server).post('/api/auth/login').send({
      email: 'admin@admin.com',
      password: 'notValidPassword1234',
    });
    expect(response.status).to.equals(401);
  });

  it('should register a new user with valid data', async () => {
    const response = await supertest(app.server)
      .post('/api/auth/register')
      .send({
        firstName: 'Hugh',
        lastName: 'Jorgan',
        email: 'hughjorgan1@example.com',
        password: 'Test1234',
      });
    expect(response.status).to.equal(201);
    expect(response.body).to.be.a('string');
  });

  it('should throw an error for existing email', async () => {
    const response = await supertest(app.server)
      .post('/api/auth/register')
      .send({
        firstName: 'Hugh',
        lastName: 'Jorgan',
        email: 'hughjorgan@example.com',
        password: 'Test1234',
      });
    expect(response.status).to.equal(422);
  });

  it('should throw an error for missing required fields', async () => {
    const response = await supertest(app.server)
      .post('/api/auth/register')
      .send({});
    expect(response.status).to.equal(422);
  });
});
