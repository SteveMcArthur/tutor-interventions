var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('default', function () {
  return gulp.src('./less/*.less')
    .pipe(less())
    .on('end', function (src) {
      console.log("Hello");
    })
    .pipe(gulp.dest('./src/css'));

});