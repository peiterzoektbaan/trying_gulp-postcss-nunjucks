var gulp   = require('gulp');
var del    = require('del');
var config = require('../../config').clean.production;

/* Delete folders and files */
gulp.task('clean:production', function() {
  return del([config.src + '/**/*']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});