(function(){
  'use strict';

  var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    paths = require('../paths');

  gulp.task('inspect', function() {
    return gulp.src(paths.js)
      .pipe(jshint({
        bitwise: true,
        curly: true,
        eqeqeq: true,
        es3: true,
        forin: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        noempty: true,
        undef: true,
        unused: true,
        trailing: true,
        node: true,
        globals: {
          require: true,
          JSON: true
        }
      }))
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'));
  });

})();
