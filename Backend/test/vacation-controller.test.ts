import { expect } from 'chai';
import { describe, it } from 'mocha';
import supertest from 'supertest';
import app from '../src/app';
import path from 'path';

let adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MzYsInV1aWQiOiIxODExYWNkNWIzYWQ0NmFlNDA5YmY0ZjcxY2QxNmRhNjJhOTBkYjMzYzk2OTdmM2NhODE0ZDE0ODExZWU1ZjZkNDRmMTdhYTA4Yjg0MTRiNWNhY2Q3YmM2YWE0MjUxZGM1ZTYyNThjOTMyYTUyNzZjNDU0YzFkNDUxYWQ1MTZlOCIsImZpcnN0TmFtZSI6IkFkbWluIiwibGFzdE5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZUlkIjoxLCJ1c2VySW1hZ2VVcmwiOiJhYjljMWMzZC1iMzZlLTRiNTQtODU3YS02NDJkYzliNzFkYzAucG5nIn0sImlhdCI6MTcwNzk1MDk1MCwiZXhwIjoxNzA4MDM3MzUwfQ.6HxuPThK4UcG1klK1Xsz_vDEPMbYLGWAHI5ZTZblr98';
let userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6NDAsInV1aWQiOiIyM2Y4MGUzNTgwNmY5MTU0NDFhNWViMDI3ODc0OWU1MjE0N2E4Mzg1ZWRkNzQ4NDc2YzRmZDc4NjAxOTFhMDlmMTI4NWJjZmY1ZTg5NjY5M2RiNmZiYmRlMDc5NGUxZWNiYmNhZTEyMWZiM2ExZTJjMzA0MGJiYjEzYmQ3ZDcyOSIsImZpcnN0TmFtZSI6InRlc3QxMjMiLCJsYXN0TmFtZSI6InRlc3QxMjMiLCJlbWFpbCI6InRlc3QxMjNAZ21haWwuY29tIiwicm9sZUlkIjoyLCJ1c2VySW1hZ2VVcmwiOiI2OTE0OWE5OC1iYzdjLTQwOTctYTFlYi1kN2ZmMTgwMmQ1ZmQuanBnIn0sImlhdCI6MTcwNzk1MzQzNSwiZXhwIjoxNzA4MDM5ODM1fQ.YGsnCHX5-ksdbXEyJgLK9-R5fg8259Km6apy5vAOqno';
let vacationId;

describe('Testing vacations endpoint:', () => {
  if (!adminToken || !userToken)
    throw new Error(
      '********* Provide valid user & admin tokens before running test! *********'
    );

  it('getting vacations without being logged in should return an unauthorized error', async () => {
    const response = await supertest(app.server).get(
      '/api/vacations/subscriptions/1'
    );
    expect(response.status).to.equal(401);
  });

  it('should return a list of vacations', async () => {
    const response = await supertest(app.server)
      .get('/api/vacations/subscriptions/1')
      .set({ Authorization: `Bearer ${adminToken}` });
    expect(response.status).to.equal(200);
    const vacations = response.body;

    expect(vacations).to.have.length.gte(1);
    expect(vacations[0]).to.have.keys(
      'vacationId',
      'vacationUuid',
      'destination',
      'description',
      'vacationStartDate',
      'vacationEndDate',
      'price',
      'vacationImageUrl',
      'followersCount',
      'isFollowing'
    );
  });

  it('should add a vacation', async () => {
    const response = await supertest(app.server)
      .post('/api/add-vacation')
      .set({ Authorization: `Bearer ${adminToken}` })
      .field('destination', 'test destination')
      .field('description', 'test description')
      .field('vacationStartDate', '1997.07.23')
      .field('vacationEndDate', '1998.06.28')
      .field('price', '666')
      .attach(
        'image',
        path.resolve(
          __dirname,
          '../',
          'src',
          '1-assets',
          'user-images',
          'ba3be371-222c-458b-9135-ea2e0f26ef40.png'
        )
      );

    expect(response.status).to.equal(201);
    expect(response.body).to.haveOwnProperty('vacationUuid');
    vacationId = response.body.vacationId;
  });

  it('should allow user to follow a vacation', async () => {
    const response = await supertest(app.server)
      .post(`/api/follow`)
      .set({ Authorization: `Bearer ${userToken}` })
      .send({
        userId: 35,
        vacationId: vacationId,
      });

    expect(response.status).to.equal(200);
  });

  it('should not allow user to follow a vacation he is already following', async () => {
    const response = await supertest(app.server)
      .post(`/api/follow`)
      .set({ Authorization: `Bearer ${userToken}` })
      .send({
        userId: 35,
        vacationId: vacationId,
      });

    expect(response.status).to.equal(500);
  });

  it('should allow user to unfollow a vacation', async () => {
    const response = await supertest(app.server)
      .delete(`/api/follow`)
      .set({ Authorization: `Bearer ${userToken}` })
      .send({
        userId: 35,
        vacationId: vacationId,
      });

    expect(response.status).to.equal(200);
  });

  it('should delete a vacation', async () => {
    const response = await supertest(app.server)
      .delete(`/api/vacations/${vacationId}`)
      .set({ Authorization: `Bearer ${adminToken}` });

    expect(response.status).to.equal(204);
  });

  it('should not allow a regular user to add a vacation', async () => {
    const response = await supertest(app.server)
      .post('/api/add-vacation')
      .set({ Authorization: `Bearer ${userToken}` })
      .field('destination', 'test destination')
      .field('description', 'test description')
      .field('vacationStartDate', '1997.07.23')
      .field('vacationEndDate', '1998.06.28')
      .field('price', '666')
      .attach(
        'image',
        path.resolve(
          __dirname,
          '../',
          'src',
          '1-assets',
          'user-images',
          'ba3be371-222c-458b-9135-ea2e0f26ef40.png'
        )
      );
    expect(response.status).to.equal(401);
  });

  it('should not allow a regular user to delete a vacation', async () => {
    const response = await supertest(app.server)
      .delete(`/api/vacations/${vacationId}`)
      .set({ Authorization: `Bearer ${userToken}` });
    expect(response.status).to.equal(401);
  });
});
