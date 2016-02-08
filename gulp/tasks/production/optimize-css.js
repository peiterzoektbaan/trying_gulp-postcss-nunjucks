var gulp           = require('gulp'),
    sourcemaps     = require('gulp-sourcemaps'),
    nano           = require('gulp-cssnano'),    
    rename         = require('gulp-rename'),
    config         = require('../../config').optimize.css;

/* Copy and minimize CSS files + Build sourcemaps */
 gulp.task('optimize:css', function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest));
});