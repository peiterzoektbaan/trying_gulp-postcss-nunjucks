var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    plumber      = require('gulp-plumber'),    
    postcss      = require('gulp-postcss'),
    precss       = require('precss'),
    autoprefixer = require('autoprefixer'),
    mqpacker     = require('css-mqpacker'),
    config       = require('../../config').styles;

function onError (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
}

/* Run CSS through PostCSS and it's plugins */
var processors = [
  precss(config.options.precss),
  autoprefixer(config.options.autoprefixer),
  mqpacker(config.options.mqpacker)
];

gulp.task('styles', function() {
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest(config.dest));
});