var src               = './app',
    srcAssets         = src + '/_assets',
    srcHtml           = src + '/_html',
    build             = './build',
    development       = build + '/development',
    developmentAssets = development + '/assets';

module.exports = {
  clean: {
    development: {
      src: development
    }
  },  
  styles: {
    src:  srcAssets + '/styles/*.css',
    dest: developmentAssets + '/css',
    options: {}
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
  }
};