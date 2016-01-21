(function () {
  'use strict';

  var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    paths = require('../paths');

  gulp.task('inspect', function () {
    return gulp.src([paths.js])
      .pipe(eslint({
        extends: 'eslint:recommended',
        parser: "babel-eslint",
        env: {
          es6: true,
          node: true
        },
        rules: {
          "semi": [2, "always"],
          "no-console": 0,
          "no-debugger": 0
        },
        globals: {
          require: true,
          JSON: true
        }
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  });
})();