var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var watch = require("gulp-watch");
//var pkg = require('./package.json');
//var browserSync = require('browser-sync').create();


// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {

    // Bootstrap
    gulp.src([
            './node_modules/bootstrap/dist/**/*',
            '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
            '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
        ])
        .pipe(gulp.dest('./vendor/bootstrap'))

    // Font Awesome
    gulp.src([
            './node_modules/font-awesome/**/*',
            '!./node_modules/font-awesome/{less,less/*}',
            '!./node_modules/font-awesome/{scss,scss/*}',
            '!./node_modules/font-awesome/.*',
            '!./node_modules/font-awesome/*.{txt,json,md}'
        ])
        .pipe(gulp.dest('./vendor/font-awesome'))

    // jQuery
    gulp.src([
            './node_modules/jquery/dist/*',
            '!./node_modules/jquery/dist/core.js'
        ])
        .pipe(gulp.dest('./vendor/jquery'))

    // jQuery Easing
    gulp.src([
            './node_modules/jquery.easing/*.js'
        ])
        .pipe(gulp.dest('./vendor/jquery-easing'))

    // Simple Line Icons
    gulp.src([
            './node_modules/simple-line-icons/fonts/**',
        ])
        .pipe(gulp.dest('./vendor/simple-line-icons/fonts'))

    gulp.src([
            './node_modules/simple-line-icons/css/**',
        ])
        .pipe(gulp.dest('./vendor/simple-line-icons/css'))

});

// Compile SCSS
gulp.task('css:compile', function () {
    console.log("css compile...");
    return gulp.src('./scss/styles.scss')
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
});


// CSS
gulp.task('css', ['css:compile'],function(){
    console.log("css minify...");
    return gulp.src([
            './src/css/*.css',
            '!./src/css/*.min.css'
        ])
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./src/css'))
});

// Default task
gulp.task('default', ['css'],function(){
    watch('./scss/*.scss',['css'],function(v){
        console.log(v.path+ " updated");
    });
});


// Dev task
gulp.task('dev', ['css'], function () {
    gulp.watch('./src/scss/*.scss', ['css']);
    //gulp.watch('./*.html', browserSync.reload);
});