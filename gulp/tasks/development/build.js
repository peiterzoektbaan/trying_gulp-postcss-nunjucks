var gulp        = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('build', function() {
  return runSequence(
    'clean',
    [
      'styles',
      'scripts',
      'images'
    ],
    'nunjucks'
  );
});