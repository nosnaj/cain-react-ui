'use strict';

var bunyan = require('bunyan'),
  BunyanPrettyStream = require('bunyan-prettystream'),
  util = require('util'),
  config = require('../config');

var prettyStream = new BunyanPrettyStream();
prettyStream.pipe(process.stdout);

function mapLevelToName(level) {
    var res = level;
    switch (level) {
        case bunyan.TRACE:
            res = 'TRACE';
            break;
        case bunyan.DEBUG:
            res = 'DEBUG';
            break;
        case bunyan.INFO:
            res = 'INFO';
            break;
        case bunyan.WARN:
            res = 'WARN';
            break;
        case bunyan.ERROR:
            res = 'ERROR';
            break;
        case bunyan.FATAL:
            res = 'FATAL';
            break;
    }
    return res;
}

var StringLogLevelRotatingFileStream = function(options) {
    bunyan.RotatingFileStream.call(this, options);
};
util.inherits(StringLogLevelRotatingFileStream, bunyan.RotatingFileStream);
StringLogLevelRotatingFileStream.prototype.write = function(rec) {
    rec.level = mapLevelToName(rec.level);
    var s = JSON.stringify(rec, bunyan.safeCycles()) + '\n';
    bunyan.RotatingFileStream.prototype.write.call(this, s);
};

var logger = bunyan.createLogger({
  name: config.AppName,
  streams: [{
     type: 'raw',
	stream: new StringLogLevelRotatingFileStream({
		path: config.LogFileName,
		level: config.LogLevel,
		period: '1d',
		count: 2
	})
  }, {
    type: 'raw',
    stream: prettyStream,
    level: config.LogLevel
  }],
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  }
});

module.exports = logger;
