var gulp    = require('gulp'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    config  = require('../../config').optimize.js;

/* Copy and minimize JS files */
gulp.task('optimize:js', function() {
  return gulp.src(config.src)
    .pipe(uglify(config.options))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.dest));
});
