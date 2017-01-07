const request = require('supertest');

describe('orders', function () {
  let server;
  beforeEach(function () {
    server = require('../app');
  });
  afterEach(function () {
    server.close();
  });

  it('responds to /orders/prices', function testSlash(done) {
    request(server)
      .post('/orders/prices')
      .expect(200, done);
  });

  it('responds to /orders/funds_distribution', function testSlash(done) {
    request(server)
      .post('/orders/funds_distribution')
      .expect(200, done);
  });
  
});
