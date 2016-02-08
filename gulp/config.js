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
      cssnext: {},
      color: {},
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
  htmltidy: {
    src:  build + '/**/*.html',
    dest: build,
    options: {
      doctype: 'html5',
      hideComments: true,
      indent: true,
      clean: true,
      indentSpaces: 2,
      wrap: 0,
      mergeDivs: false,
      mergeEmphasis: false,
      mergeSpans: false
    }
  },  
  watch: {
    styles:   srcAssets + '/styles/**/*.css',
    scripts:  srcAssets + '/scripts/**/*.js',
    images:   srcAssets + '/images/**/*',
    html:     srcHtml + '/**/*.+(html|nunjucks|json)'    
  }
};