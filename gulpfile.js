// Include gulp
var gulp = require('gulp'),
    del = require('del'),
    bower = require('gulp-bower'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    config = {
        bowerDir: './bower_components/',
        distDir: './build/',
        cssminOptions: {keepSpecialComments: 1},
        uglifyOptions: {
            preserveComments: 'some',
            mangle: false
        },
    };


//Clean previous dist
gulp.task('clean', function () {
    return del([config.distDir + './*']);
});

gulp.task('bower', function () {
    return bower();
});

gulp.task('img',function(){
    return gulp.src('./images/*')
        .pipe(gulp.dest(config.distDir + './images'))
})

//Check js
gulp.task('lint',['bower'], function () {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify CSS
gulp.task('mini-css', function () {
    gulp.src('./css/*.css')
        .pipe(concat('zepto.alert.css'))
        .pipe(gulp.dest(config.distDir + './css'))
        .pipe(cssmin(config.cssminOptions))
        .pipe(rename('zepto.alert.min.css'))
        .pipe(gulp.dest(config.distDir + './css'));
});

gulp.task('css', ['mini-css']);


// Concatenate & Minify JS
gulp.task('scripts', ['clean'], function () {
    return gulp.src('./js/*.js')
        .pipe(concat('zepto.alert.js'))
        .pipe(gulp.dest(config.distDir))
        .pipe(rename('zepto.alert.min.js'))
        .pipe(uglify(config.uglifyOptions))
        .pipe(gulp.dest(config.distDir));
});


// Default Task
gulp.task('default', ['clean', 'img', 'bower', 'lint', 'css', 'scripts']);
