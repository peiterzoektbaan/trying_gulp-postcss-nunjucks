var gulp           = require('gulp'),
    fs             = require('fs'),
    data           = require('gulp-data'),
    nunjucksRender = require('gulp-nunjucks-render'),
    config         = require('../../config').nunjucks,
    jsonData       = JSON.parse(fs.readFileSync(config.options.srcData));
    
gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure([config.options.srcTemplates], {watch: false});
  return gulp.src(config.options.srcPages)
    .pipe(data(function() {
      return jsonData
    }))
    .pipe(nunjucksRender({
      env: 'development',
      config: {
        url:      '',
        basepath: '',
        jspath:   'assets/js/',
        csspath:  'assets/css/',
        imgpath:  'assets/img/'
      }
    }))
    .pipe(gulp.dest(config.dest));
});