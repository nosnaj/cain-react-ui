'use strict';

var raygun = require('raygun');

var raygunReport = function(server, appName) {
  var rayGunClient = new raygun.Client().init({ apiKey: process.env.RAYGUN_API_KEY });

  function deliverToRaygun(req, err) {
    if(process.env.RAYGUN_API_KEY) {
      rayGunClient.send(err, {}, function () {}, req, [appName]);
    }
  }

  server.on('uncaughtException', function(req, res, route, err) {
    deliverToRaygun(req, err);
  });

  server.on('after', function(req, res) {
    if (res.statusCode >= 500) {
      deliverToRaygun(req, res._data);
    }
  });
};

module.exports  = raygunReport;
