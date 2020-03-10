/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';

describe('Customer', () => {
  it('should be able to register.', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'Caio Cobacho Dev',
        email: 'caiocobacho1@dev.com',
      });
    expect(response.status).toBe(200);
  });

  it('should not be able to register with duplicate email.', async () => {
    await request(app)
      .post('/customer')
      .send({
        name: 'Caio Cobacho',
        email: 'caiocobacho@hotmail.com',
      });

    const response = await request(app)
      .post('/customer')
      .send({
        name: 'Caio Cobacho',
        email: 'caiocobacho@hotmail.com',
      });
    expect(response.status).toBe(400);
  });

  const auth = {};

  it('should be able to delete a customer.', async () => {
    const response = await request(app)
      .delete('/customer')
      .set('Authorization', `bearer ${auth.token}`);

    expect(response.status).toBe(200);
  });
});
