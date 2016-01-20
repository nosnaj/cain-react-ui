var chai = require('chai'),
  request = require('supertest'),
  app = require('../src/app');

describe('GET _healthcheck', function () {
  it('should return with 200 status code', function (done) {
    request(app)
      .get('/_healthcheck')
      .expect(200, done);
  });
});
