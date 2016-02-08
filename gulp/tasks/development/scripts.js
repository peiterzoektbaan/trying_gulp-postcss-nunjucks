var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    plumber = require('gulp-plumber'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    config  = require('../../config').scripts;

function onError (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
}    

/* Bundle js files */
 gulp.task('scripts', function() {
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(config.dest));
});