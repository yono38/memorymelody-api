/**
 * Created by yono38 on 8/18/15.
 */
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint');

var jsFiles = './**/*.js';

gulp.task('default', ['jshint', 'nodemon', 'watch']);

gulp.task('jshint', function () {
    return gulp.src(jsFiles)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('nodemon', function() {
    nodemon({
        script:'index.js',
        ext:'js',
        ignore:['node_modules/*'],
        env:{
            PORT:8009
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(jsFiles, ['jshint']);
});
