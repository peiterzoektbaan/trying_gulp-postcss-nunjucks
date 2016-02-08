var gulp        = require('gulp'),
      imagemin  = require('gulp-imagemin'),
      pngquant  = require('imagemin-pngquant'),
      config    = require('../../config').optimize.images;

/* Copy and minimize image files */
gulp.task('optimize:images', function() {
  return gulp.src(config.src)
    .pipe(imagemin({
        optimizationLevel: 3,
      	progressive: true,
        interlaced: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant({ quality: '65-80', speed: 4 })]
    }))
    .pipe(gulp.dest(config.dest));
});