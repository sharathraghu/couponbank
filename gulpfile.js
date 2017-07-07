var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyHtml = require("gulp-minify-html");
var del = require('del');


gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('css', function () {
    return gulp.src(['views/css/style.css'])
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/views/css'));
});

gulp.task('lint', function () {
    return gulp.src('views/js/script.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function () {
    return gulp.src('views/js/scripts.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/views/js'));
});

gulp.task('html', function () {
    return gulp.src('views/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/views'));
});

gulp.task('copyCSS', function () {
    return gulp.src(['views/css/bootstrap-theme.min.css','views/css/bootstrap.min.css'])
        .pipe(gulp.dest('dist/views/css'));
});

gulp.task('copyFont', function () {
    return gulp.src(['views/fonts/*.*'])
        .pipe(gulp.dest('dist/views/fonts'));
});

gulp.task('copyImgs', function () {
    return gulp.src('views/imgs/*.*')
        .pipe(gulp.dest('dist/views/imgs'));
});

gulp.task('copyJs', function () {
    return gulp.src(['views/js/bootstrap.min.js','views/js/jquery.cropit.js','views/js/jquery.min.js'])
        .pipe(gulp.dest('dist/views/js'));
});

gulp.task('watch', function () {
    return gulp.watch(['views', 'classes']);
});

gulp.task('build', ['clean'], function () {
    gulp.start('lint','css','scripts','html','copyCSS','copyFont','copyImgs','copyJs');
});

gulp.task('dev', ['clean'], function () {
    gulp.start('lint','css','scripts','html','copyCSS','copyFont','copyImgs','copyJs','watch');
});