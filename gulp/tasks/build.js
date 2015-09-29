import del from 'del';
import gulp from 'gulp'
import util from 'gulp-util';
import inject from 'gulp-inject';
import size from 'gulp-size';
import useref from 'gulp-useref';
import usemin from 'gulp-usemin';
import uglify from 'gulp-uglify';
import rev from 'gulp-rev';
import minifyCss from 'gulp-minify-css';
import runSequence from 'run-sequence';

import paths from '../paths';

const LOG = util.log;
const COLORS = util.colors;

gulp.task('clean', (cb) => {
    const files = [paths.build.root];
    LOG('Cleaning: ' + COLORS.blue(files));
    return del(files, cb);
});

gulp.task('remove-build-file', (cb)=>{
    return del(paths.build.script, cb);
});

gulp.task('extras', () => {
    return gulp.src([paths.app.root + '*.{ico,png,txt}'])
        .pipe(gulp.dest(paths.build.root));
});

gulp.task('compile', ['less', 'bundle'], () => {
    return gulp.src(paths.app.html)
        .pipe(inject(gulp.src(paths.build.script, {read:false}), {
            starttag: '<!-- inject:build:js -->'
        }))
        .pipe(usemin({
            css:[ minifyCss(), rev() ],
            js: [ uglify(), rev() ]
        }))
        .pipe(gulp.dest(paths.build.root))
        .pipe(size({title: 'compile', showFiles: true}));
});

gulp.task('build', (cb) => {
    runSequence(
        ['clean'],
        ['compile', 'extras', 'images', 'fonts'],
        ['remove-build-file'],
        cb
    );
});
