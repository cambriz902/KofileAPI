const request = require('supertest');
const should = require('should');

describe('orders', function () {
  describe('POST /orders/prices', function () {
    let server;
    beforeEach(function () {
      server = require('../app');
    });
    afterEach(function () {
      server.close();
    });

    it('responds to /orders/prices', function(done) {
      request(server)
        .post('/orders/prices')
        .expect(200)
        .end(function(err, res){
          done(err);
        });
    });
  });

  describe('POST /orders/funds_distribution', function () {
    let server;
    beforeEach(function () {
      server = require('../app');
    });
    afterEach(function () {
      server.close();
    });

    it('responds to /orders/funds_distribution', function(done) {
      request(server)
        .post('/orders/funds_distribution')
        .expect(200)
        .end(function(err, res){
          done(err);
        });
    });
  });
});
