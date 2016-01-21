(function() {
  'use strict';

  var gulp = require('gulp'),
    babel = require('gulp-babel'),
    paths = require('../paths'),
    webpack = require('webpack'),
    webpackConfig = require('../../src/webpack.config.js'),
    path = require('path');
    
  gulp.task('build:js', ['clean'], function(done){
    return gulp.src('src/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest(paths.build), done);    
  });
  
  gulp.task('build:webpack', ['clean'], function(done){
    var config = webpackConfig();
    config.output.path = path.join(__dirname, '../../dist/static');
     
    webpack(config, done);
  });
  
  gulp.task('build:static', ['clean'], function(done){
    return gulp.src('src/static/**/*.*')
      .pipe(gulp.dest(path.join(paths.build, 'static')), done);
      
    // webpack(webpackConfig(path.join(__dirname, '../../dist')), done);
  });
  
  gulp.task('build', ['build:js', 'build:webpack', 'build:static'], function(done) {
    
  });

})();
