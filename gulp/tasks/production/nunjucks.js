var gulp           = require('gulp'),
    fs             = require('fs'),
    data           = require('gulp-data'),
    nunjucksRender = require('gulp-nunjucks-render'),
    config         = require('../../config').nunjucks.production,
    jsonData       = JSON.parse(fs.readFileSync(config.options.srcData));    

gulp.task('nunjucks:production', function() {
  nunjucksRender.nunjucks.configure([config.options.srcTemplates], {watch: false});
  return gulp.src(config.options.srcPages)
    .pipe(data(function() {
      return jsonData
    }))
    .pipe(nunjucksRender({
      env: 'production',
      config: {      
        url:      '', // http://company.com
        basepath: '', // base path /
        jspath:   'assets/js/',
        csspath:  'assets/css/',
        imgpath:  'assets/img/'
      }
    }))
    .pipe(gulp.dest(config.dest));
});