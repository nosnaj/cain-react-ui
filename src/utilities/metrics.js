'use strict';

var StatsD = require('node-statsd'),
  sprintf = require("sprintf-js").sprintf,
  config = require('../config');

module.exports = function(logger) {
  var client = new StatsD({
    host: config.StatsDHost,
    prefix: config.AppName + '.',
    mock: !config.StatsDHost // Assume mock if not defined
  });

  var getRequestMetricName = function(req) {
    if (!req.route) {
      return null;
    }

    var name = req.route.path
      .split("/")
      .filter(function(segment) {
        return segment && segment.indexOf(":") < 0;
      }).join(".");
    return sprintf("http.%s.%s", req.method, name).toLowerCase();
  };

  var requestCounter = function(req) {
    var metric = getRequestMetricName(req);
    if (metric) {
      client.increment(metric);
    }
  };

  var requestTime = function(req) {
    var metric = getRequestMetricName(req);
    if (metric) {
      var totalTime = new Date().getTime() - req.time();
      client.timing(metric, totalTime);
    }
  };

  var requestStatus = function(req, res) {
    var metric = sprintf("%s.status_code.%i", getRequestMetricName(req), res.statusCode);
    if (metric) {
      client.increment(metric);
    }
  };

  client.socket.on('error', function(error) {
    logger.error("Error in socket: ", error);
  });

  return {
    requestCounter: requestCounter,
    requestTime: requestTime,
    requestStatus: requestStatus
  };
};
