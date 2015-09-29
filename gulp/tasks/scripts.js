'use strict';

import gulp from 'gulp';
import jshint from 'gulp-jshint';
import babel from 'gulp-babel';

import {LOG,COLORS,ENV} from '../const';
import paths from '../paths';
import options from '../babel-options';

gulp.task('jshint', () => {
  return gulp.src(paths.app.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


gulp.task('bundle', (cb) => {
  let Builder = require('systemjs-builder');
  let builder = new Builder('./src');
  let inputPath = 'app/bootstrap';
  let outputFile = paths.build.script;
  let outputOptions = {runtime: false, sourceMaps: true, config: {sourceRoot: paths.app.scripts}};

  builder.loadConfig(paths.jspmConfig, true, true).then(() => {
      builder.buildStatic(inputPath, outputFile, outputOptions)
        .then(() => {
          return cb();
        })
        .catch((ex) => {
          cb(new Error(ex));
        });
    });
});

gulp.task('es6', function () {
    return gulp.src(paths.app.scripts)
        .pipe(babel(extend({}, options, {modules:'system'})))
        .pipe(gulp.dest(paths.dev.scripts));
});

function extend(obj){
    for(var i = 1;i<arguments.length;i+=1){
        var item = arguments[i];
        Object.keys(item).forEach(function(name){
            obj[name] = item[name];
        });
    }
    return obj;
}
