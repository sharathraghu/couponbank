var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyHtml = require("gulp-minify-html");
var del = require('del');
var nodemon = require('gulp-nodemon');

gulp.task('clean', function () {
    del(['dist']);
});

gulp.task('css', function () {
    gulp.src(['public/views/css/style.css'])
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/views/css'));
});

gulp.task('lint', function () {
    gulp.src('public/views/js/script.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function () {
    gulp.src('public/views/js/scripts.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/views/js'));
});

gulp.task('html', function () {
    gulp.src('public/views/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/views'));
});

gulp.task('copyCSS', function () {
    gulp.src(['public/views/css/bootstrap-theme.min.css', 'public/views/css/bootstrap.min.css'])
        .pipe(gulp.dest('dist/views/css'));
});

gulp.task('copyFont', function () {
    gulp.src(['public/views/fonts/*.*'])
        .pipe(gulp.dest('dist/views/fonts'));
});

gulp.task('copyImgs', function () {
    gulp.src('public/views/imgs/*.*')
        .pipe(gulp.dest('dist/views/imgs'));
});

gulp.task('copyJs', function () {
    gulp.src(['public/views/js/bootstrap.min.js', 'public/views/js/jquery.cropit.js', 'public/views/js/jquery.min.js'])
        .pipe(gulp.dest('dist/views/js'));
});

gulp.task('watch-public-app', function () {
    gulp.watch(['public/views', 'app/classes', 'app/controllers']);
});

gulp.task('build', ['clean','lint', 'css', 'scripts', 'html', 'copyCSS', 'copyJs','copyFont', 'copyImgs']);

gulp.task('dev', ['build'], function () {
    nodemon({
        script: './server.js',
        env: { 'NODE_ENV': 'development' },
        ignore: ['./dist/'],
        tasks: ['build']
    }).on('start', ['watch-public-app']);
});