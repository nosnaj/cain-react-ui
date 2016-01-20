var chai = require('chai'),
  request = require('supertest'),
  app = require('../src/app');

describe('GET sample endpoint', function () {
  it('should return with 200 status code', function (done) {
    request(app)
      .post('/sample')
      .expect(200, done);
  });
});

describe('GET /', function () {
  it('should return with 200 status code', function (done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
