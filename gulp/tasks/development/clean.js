var gulp   = require('gulp'),
    del    = require('del'),
    config = require('../../config').clean;

/* Delete folders and files */
gulp.task('clean', function() {
  return del([config.src + '/**/*']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});