'use strict';

import gulp from 'gulp';
import concat from 'gulp-concat';
import filter from 'gulp-filter';
import browserSync from 'browser-sync';

import less from 'gulp-less';

import paths from '../paths';

gulp.task('less', () => {
  return gulp.src(paths.app.styles)
    .pipe(less())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(paths.tmp.styles))
    .pipe(filter('**/*.css')) // Filtering stream to only css files
    .pipe(browserSync.reload({stream: true}));
});
