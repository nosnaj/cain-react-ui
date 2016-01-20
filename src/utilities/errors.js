'use strict';

var raygun = require('raygun'),
  config = require('../config');

var rayGunClient = new raygun.Client().init({ apiKey: config.RaygunApiKey });
var sendToRaygun = function(err, req) {
  if (config.RaygunApiKey) {
    rayGunClient.send(err, {}, function () {}, req, [ config.AppName ]);
  }
};

module.exports = {
  warn: function(req, res, err, next) {
    req.log.warn(err);
    return next();
  },
  error: function(req, res, err, next) {
    req.log.error(err);
    sendToRaygun(err, req);
    return next();
  },
  uncaught: function(req, res, route, err) {
    req.log.error(err, 'Uncaught exception');
    sendToRaygun(err, req);
  }
};