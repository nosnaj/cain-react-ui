'use strict';

require('dotenv').load();

module.exports = {
  AppName: 'cain-react-ui',
  LogFileName: process.env.LogFileName || "./cain-react-ui.json",
  LogLevel: process.env.LogLevel || "WARN",
  Port: process.env.PORT || 9000,
  StatsDHost: process.env.StatsDHost,
  HostName: process.env.HostName,
  RaygunApiKey: process.env.RaygunApiKey
};
