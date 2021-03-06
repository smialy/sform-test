'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import paths from '../paths';

gulp.task('watch', () => {

    gulp.watch([paths.app.images, paths.app.fonts], [browserSync.reload]);

    gulp.watch(paths.app.less, ['less', browserSync.reload]);

    gulp.watch([paths.app.html, paths.app.templates], [browserSync.reload]);

    gulp.watch([paths.app.scripts], ['es6', browserSync.reload]);

});
