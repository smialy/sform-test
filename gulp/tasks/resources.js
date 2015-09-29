'use strict';

import gulp from 'gulp';
import size from 'gulp-size';
import imagemin from 'gulp-imagemin';
import less from 'gulp-less';
import concat from 'gulp-concat';
import filter from 'gulp-filter';
import browserSync from 'browser-sync';
import flatten from 'gulp-flatten';

import paths from '../paths';

gulp.task('less', () => {
  return gulp.src(paths.app.styles)
    .pipe(less())
    .pipe(concat('build.css'))
    .pipe(gulp.dest(paths.build.styles))
});

gulp.task('less-dev', () => {
  return gulp.src(paths.app.styles)
    .pipe(less())
    .pipe(gulp.dest(paths.dev.styles))
    .pipe(filter('**/*.css')) // Filtering stream to only css files
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('images', () => {
    return gulp.src(paths.app.images)
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(paths.build.images))
        .pipe(size({title: 'images'}));
});
gulp.task('fonts', () => {
    return gulp.src(paths.app.fonts)
        .pipe(flatten())
        .pipe(gulp.dest(paths.build.fonts))
        .pipe(size({title: 'fonts'}));
});
