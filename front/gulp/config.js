var resolve = require('path').resolve;
var root = resolve(__dirname, '..');
var version = require('../package.json').version;

var dest = resolve(root, './dist/Deltachat-UI-' + version);
var env = require('./env');
var src = resolve(root, './src');
var webpack = require('webpack');

module.exports = {
  paths: {
    dest: dest,
    root: root,
    src: src
  },
  app: {
    dest: dest,
    name: 'app.js',
    src: src + '/app/core/app.js',
    templates: src + '/app/**/**.html',
    vendor: 'vendor.js',
    version: version
  },
  tasks: {
    browsersync: {
      files: [
        dest + '/**/*.js',
        dest + '/**/*.html'
      ],
      ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
      },
      logLevel: 'warn',
      logPrefix: 'BrowserSync',
      logConnections: false,
      logFileChanges: false,
      open: false,
      reloadDebounce: 1000,
      server: {
        baseDir: dest
      }
    },
    browsersyncNoSync: {
      files: [
        dest + '/**/*.js',
        dest + '/**/*.html'
      ],
      ghostMode: false,
      logLevel: 'warn',
      logPrefix: 'BrowserSync',
      logConnections: false,
      logFileChanges: false,
      open: false,
      reloadDebounce: 1000,
      server: {
        baseDir: dest
      }
    },
    hooks: {
      src: root + '/gulp/hooks/{pre-commit,pre-push}',
      dest: root + '/.git/hooks/'
    },
    lint: {
      jscs: {
        configPath: root + '/.jscsrc',
        fix: true
      },
      jshint: {
        files: [
          root + '/gulpfile.js',
          root + '/gulp/**/*.js',
          src + '/app/**/**.js'
        ]
      },
      utf8: {
        files: [
          src + '/app/**/**.html',
          src + '/app/**/**.js',
          src + '/styles/**/**.less'
        ]
      }
    },
    styles: {
      fonts: {
        fontAwesomeFontSrc: root + '/node_modules/font-awesome/fonts/*.{otf,eot,svg,ttf,woff,woff2}',
        bootstrapFontSrc: root + '/node_modules/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}',
        dest: dest + '/fonts',
        src: src + '/styles/fonts/*.{eot,svg,ttf,woff,woff2}'
      },
      less: {
        src: src + '/styles/less/common.less'
      },
      sass: {
        src: src + '/styles/sass/common.scss'
      },
      merge: {
        name: 'bundle.css'
      }
    },
    translate: {
      clientIds:[
        {
          clientId: 'gulp-translate-json-1',
          secret: '+JjfCJjuFZ9uNf1wP54z6xBDG9Ncqp8f7Qe3qyts45o='
        },
        {
          clientId: 'gulp-translate-json-2',
          secret: 'j7GFFH6GL1Fo7hQhqjDjTqU+K1MCy01wJCk+/FgBb6g='
        },
        {
          clientId: 'gulp-translate-json-3',
          secret: 'AWHjrdJ8NlnQ6/e3NMKcs70MOV7ACl8WcPWKKa7vGwg='
        }
      ],
      locales: [
        {
          name: 'Arabic',
          localeCode: 'ar',
          langCode: 'ar',
          lang: 'ar'
        },
        {
          name: 'Egyptian Arabic',
          localeCode: 'ar-eg',
          langCode: 'ar_EG',
          lang: 'ar-eg'
        },
        {
          name: 'German',
          localeCode: 'de',
          langCode: 'de',
          lang: 'de'
        },
        {
          name: 'English',
          localeCode: 'en',
          langCode: 'en',
          lang: 'en'
        },
        {
          name: 'English US',
          localeCode: 'en-us',
          langCode: 'en_US',
          lang: 'en-us'
        },
        {
          name: 'English UK',
          localeCode: 'en-gb',
          langCode: 'en_GB',
          lang: 'en-gb'
        },
        {
          name: 'French',
          localeCode: 'fr',
          langCode: 'fr',
          lang: 'fr'
        },
        {
          name: 'Chinese Simplified',
          localeCode: 'zh-cn',
          langCode: 'zh_CN',
          lang: 'zh-cn'
        },
        {
          name: 'Chinese Traditional',
          localeCode: 'zh-tw',
          langCode: 'zh_TW',
          lang: 'zh-tw'
        }
      ],
      masterLanguage: 'en',
      src: src + '/assets/languages/strings.json',
      dest: src + '/assets/languages'
    },
    version: {
      dest: src + '/app/core/version.js'
    },
    watch: {
      assets: {
        images: {
          dest: dest + '/assets',
          src: src + '/assets/images/*.{jpg,png,svg,ico}'
        },
        languages: {
          dest: dest + '/assets',
          src: src + '/assets/languages/*.json'
        },
        locales: {
          dest: dest + '/assets',
          src: root + '/node_modules/angular-i18n/{' +
            'angular-locale_ar,' +
            'angular-locale_ar-eg,' +
            'angular-locale_de,' +
            'angular-locale_en,' +
            'angular-locale_en-us,' +
            'angular-locale_en-gb,' +
            'angular-locale_fr,' +
            'angular-locale_zh-cn,' +
            'angular-locale_zh-tw' +
            '}.js'
        }
      },
      less: src + '/**/*.less',
      templates: src + '/**/*.html'
    },
    webpack: [
      // App Bundles
      {
        devtool: env.sourceMaps ? 'inline-sourcemap' : null,
        entry: {
          'app': src + '/app/core/app.js'
        },
        module: {
          loaders: [
            {test: /\.json$/, loader: 'json'},
            {test: /\.js$/, loader: 'ng-annotate?add=true&remove=false&single_quotes=true'},
            {test: /\.html$/, loader: 'html?attrs=false'}
          ]
        },
        output: {
          filename: '[name].js',
          path: resolve(dest + '/bundles'),
          publicPath: '/bundles/'
        },
        plugins: [
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              drop_debugger: false,
              warnings: false
            },
            mangle: env.minify,
            output: {beautify: !env.minify}
          }),
          new webpack.optimize.DedupePlugin()
        ],
        watch: env.watch
      },
      // Vendor Bundle
      {
        entry: {
          'vendor': src + '/app/core/vendors.js'
        },
        output: {
          filename: '[name].js',
          path: resolve(dest + '/bundles'),
          publicPath: '/bundles/'
        },
        plugins: [
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              drop_debugger: false,
              warnings: false
            },
            mangle: true
          }),
          new webpack.optimize.DedupePlugin()
        ]
      }

    ]
  }
};
