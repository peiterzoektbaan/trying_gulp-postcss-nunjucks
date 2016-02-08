var src               = './app',
    srcAssets         = src + '/_assets',
    srcHtml           = src + '/_html',
    build             = './build',
    development       = build + '/development',
    developmentAssets = development + '/assets';

module.exports = {
  clean: {
    src: development
  },
  nunjucks: {
    src:   src,
    dest:  development,
    options: {
        srcTemplates: srcHtml + '/templates',
        srcPages: srcHtml + '/pages/**/*.+(html|nunjucks)',
        srcData: srcHtml + '/data/data.json'
    }
  },  
  styles: {
    src:  srcAssets + '/styles/*.css',
    dest: developmentAssets + '/css',
    options: {
      precss: {},
      autoprefixer: {
        browsers: ['last 3 versions'],
        cascade: true
      },
      mqpacker: {}      
    }
  },
  scripts: {
    src:  srcAssets + '/scripts/*.js',
    dest: developmentAssets + '/js',
    options: {}
  },
  images: {
    src:  srcAssets + '/images/**/*',
    dest: developmentAssets + '/img',
    options: {}
  },
  watch: {
    styles:   srcAssets + '/styles/**/*.css',
    scripts:  srcAssets + '/scripts/**/*.js',
    images:   srcAssets + '/images/**/*',
    html:     srcHtml + '/**/*.+(html|nunjucks|json)'    
  }
};