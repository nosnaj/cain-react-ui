(function(){
  'use strict';

  var gulp = require('gulp'),
    paths = require('../paths'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    coverageEnforcer = require("gulp-istanbul-enforcer");

  gulp.task('test', ['build'], function () {
    return gulp.src([paths.js, '!src/utilities/*.js'])
      .pipe(istanbul()) // Covering files
      .pipe(istanbul.hookRequire()) // Force `require` to return covered files
      .on('finish', function () {
        gulp.src([paths.unit_tests])
          .pipe(mocha({reporter: process.env.TEAMCITY_VERSION ? 'mocha-teamcity-reporter' : 'spec'}))
          .pipe(istanbul.writeReports())
          .pipe(coverageEnforcer({
            thresholds : {
              statements : 100,
              branches : 100,
              lines : 100,
              functions : 100
            },
            coverageDirectory: paths.coverage,
            rootDirectory: ''
          })); // Creating the reports after tests have run
      });
  });

})();