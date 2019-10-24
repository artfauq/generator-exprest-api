const supertest = require('supertest');
const { expect } = require('chai');

const app = require('../src');

const request = supertest(app);

describe('API', () => {
  describe('GET /', () => {
    it('should return 200 on base API route', async () => {
      const { status } = await request.get('/api');

      expect(status).to.equal(200);
    });
  });

  describe('POST /', () => {
    it('should return 404 on unknown API route / method', async () => {
      await request
        .post('/api')
        .set('Accept', 'application/json')
        .expect(404)
        .expect(({ body }) => {
          expect(body).to.be.an('object');

          expect(body).to.have.property('status');
          expect(body).to.have.property('name');
          expect(body).to.have.property('message');

          expect(body.name).to.equal('NotFoundError');
        });
    });
  });
});
