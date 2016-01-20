(function() {
  'use strict';

  var gulp = require('gulp'),
    paths = require('../paths'),
    mocha = require('gulp-mocha');

  gulp.task('smoke', function() {
    return gulp.src(paths.smoke_tests, {read: true})
      .pipe(mocha({reporter: process.env.TEAMCITY_VERSION ? 'mocha-teamcity-reporter' : 'spec'}));
  });

})();