(function() {
  'use strict';

  var gulp = require('gulp'),
    rimraf = require('rimraf'),
    paths = require('../paths');

    gulp.task('clean', function(cb){
      rimraf(paths.build, cb);
    });
})();
