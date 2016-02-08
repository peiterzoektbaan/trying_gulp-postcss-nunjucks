var gulp    = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    config  = require('../../config').optimize.html;

/* Minimize HTML */
gulp.task('optimize:html', function() {
  return gulp.src(config.src)
    .pipe(htmlmin(config.options))
    .pipe(gulp.dest(config.dest));
}); 
