(function() {
  'use strict';

  module.exports = {
    build: 'dist',
    startupFile: 'src/server.js',
    js: 'src/**/*.js',
    unit_tests: "test/**/*.spec.js",
    smoke_tests: "smoke/*_spec.js",
    coverage: 'coverage',
    port: 9000
  };
})();
