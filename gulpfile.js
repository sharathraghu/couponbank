var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyHtml = require("gulp-minify-html");
var del = require('del');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('css', function () {
    return gulp.src(['public/views/css/style.css'])
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/views/css'));
});

gulp.task('lint', function () {
    return gulp.src('public/views/js/script.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function () {
    return gulp.src('public/views/js/scripts.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/views/js'));
});

gulp.task('html', function () {
    return gulp.src('public/views/*.html')
        .pipe(gulp.dest('dist/views'));
});

gulp.task('copyCSS', function () {
    return gulp.src(['public/views/css/bootstrap-theme.min.css', 'public/views/css/bootstrap.min.css'])
        .pipe(gulp.dest('dist/views/css'));
});

gulp.task('copyFont', function () {
    return gulp.src(['public/views/fonts/*.*'])
        .pipe(gulp.dest('dist/views/fonts'));
});

gulp.task('copyImgs', function () {
    return gulp.src('public/views/imgs/*.*')
        .pipe(gulp.dest('dist/views/imgs'));
});

gulp.task('copyJs', function () {
    return gulp.src(['public/views/js/bootstrap.min.js', 'public/views/js/jquery.cropit.js', 'public/views/js/jquery.min.js'])
        .pipe(gulp.dest('dist/views/js'));
});

gulp.task('watch-public-app', function () {
    gulp.watch(['./public/views/*.*', './app/classes/*.*', './app/controllers/*.*']);
});

gulp.task('nodemon', function(){
    return  nodemon({
        script: './server.js',
        env: { 'NODE_ENV': 'development' },
        ignore: ['./dist/'],
        tasks: ['build'],
        watch: ['./public/*.*','./app/*.*']
    });
});

gulp.task('build', function(done) {
    runSequence('clean','copyCSS', 'copyJs','copyFont', 'copyImgs', 'lint', 'css', 'scripts', 'html', done);
});

gulp.task('dev', function (done) {
  runSequence('build', 'nodemon', done);
});