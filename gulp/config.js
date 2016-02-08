var src               = './app',
    srcAssets         = src + '/_assets',
    srcHtml           = src + '/_html',
    build             = './build',
    development       = build + '/development',
    developmentAssets = development + '/assets',
    production        = build + '/production',
    productionAssets  = production + '/assets';

module.exports = {
    // Clean assets 
    clean: {
        development: {
            src: development
        },
        production: {
            src: production
        }
    },
    // Build html from nunjuck templates    
    nunjucks: {
        development: {      
            src:   src,
            dest:  development,
            options: {
                srcTemplates: srcHtml + '/templates',
                srcPages: srcHtml + '/pages/**/*.+(html|nunjucks)',
                srcData: srcHtml + '/data/data.json'
            }
        },
        production: {
            src:   src,
            dest:  production,
            options: {
                srcTemplates: srcHtml + '/templates',
                srcPages: srcHtml + '/pages/**/*.+(html|nunjucks)',
                srcData: srcHtml + '/data/data.json'
            }
        }
    }, 
    // Process styles, scripts and images for development    
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
    // Cleanup heml code    
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
    // Watch for changes    
    watch: {
        styles:   srcAssets + '/styles/**/*.css',
        scripts:  srcAssets + '/scripts/**/*.js',
        images:   srcAssets + '/images/**/*',
        html:     srcHtml + '/**/*.+(html|nunjucks|json)'    
    },
    // Optimize assets for production
    optimize: {
        css: {
            src:  developmentAssets + '/css/*.css',
            dest: productionAssets + '/css/',
            options: {}
        },
        js: {
            src:  developmentAssets + '/js/*.js',
            dest: productionAssets + '/js/',
            options: {}
        },
        images: {
            src:  developmentAssets + '/img/**/*.{jpg,png,gif}',
            dest: productionAssets + '/img/',
            options: {}
        },
        html: {
            src: production + '/**/*.html',
            dest: production,
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true
            }
        }
    },
    // Revisioning
    revision: {    
        src: {
            assets: [
                productionAssets + '/css/*.css',
                productionAssets + '/js/*.js',
                productionAssets + '/img/**/*'
            ],
            base: production
        },
        dest: {
            assets: production,
            manifest: {
                name: 'rev-manifest.json',
                path: productionAssets
            }
        }
    },
    collect: {
        src: [
            productionAssets + '/rev-manifest.json',
            production + '/**/*.{html,xml,txt,json,css,js}',
            '!' + production + '/feed.xml'
        ],
        dest: production
    },    
};