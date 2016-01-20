(function() {
  'use strict';

  var gulp = require('gulp'),
    paths = require('../paths');

  gulp.task('build', ['clean', 'inspect'], function(done){
    return gulp.src('src/**/*.*')
      .pipe(gulp.dest(paths.build), done);
  });

})();