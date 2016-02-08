var gulp      = require('gulp'),
    htmltidy  = require('gulp-htmltidy'),
    config    = require('../../config').htmltidy;
 
gulp.task('htmltidy', ['nunjucks'], function() {
  return gulp.src(config.src)
    .pipe(htmltidy(config.options))
    .pipe(gulp.dest(config.dest));
});