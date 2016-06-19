var resolve = require('path').resolve;
var root = resolve(__dirname, '..');
var version = require('../package.json').version;

var dest = resolve(root, './dist/deltachat-' + version);
var env = require('./env');
var istanbul = require('browserify-istanbul');
var src = resolve(root, './src');

module.exports = {
  paths: {
    dest: dest,
    root: root,
    src: src
  },
  app: {
    dest: dest,
    name: 'deltachat.js',
    src: src + '/app/core/deltachat-app.js',
    templates: src + '/app/**/**.html',
    version: version
  },
  tasks: {
    browserify: {
      cache: {},
      debug: env.sourceMaps,
      entries: src + '/app/core/deltachat.js',
      fullPaths: true,
      packageCache: {}
    },
    browserSync: {
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
          root + '/test/**/*.js',
          src + '/app/**/**.js'
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
        name: 'bundle.css',
        src: src + '/styles/less/common.less'
      }
    },
    test: {
      karma: {
        configSrc: root + '/karma.conf.js',
        config: {
          autoWatch: false,
          autoWatchBatchDelay: 500,
          basePath: '',
          browserify: {
            debug: true,
            transform: [istanbul({
              ignore: [
                '**/node_modules/**',
                '**/*.specs.js',
                '**/index.js',
                '**/states.js',
                '**/deltachat.js',
                '**/*.constant.js'
              ]
            })]
          },
          browsers: ['PhantomJS'],
          colors: true,
          coverageReporter: {
            reporters: [
              {type: 'text-summary'},
              {type: 'html', dir: 'coverage/'}
            ]
          },
          concurrency: Infinity,
          exclude: [],
          defaultFiles: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/lodash/index.js'
          ],
          frameworks: ['browserify', 'jasmine'],
          mochaReporter: {
            output: 'full'
          },
          plugins: [
            'karma-browserify',
            'karma-coverage',
            'karma-jasmine',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher'
          ],
          port: 9876,
          preprocessors: {
            'src/app/**/*.js': ['browserify']
          },
          reporters: ['mocha', 'coverage'],
          restartOnFileChange: true,
          singleRun: true
        }
      },
      src: src + '/app/**/*.specs.js'
    },
    translate: {
      clientId: 'gulp-translate-json',
      clientSecret: 'zUq/6bV7/gUAC9vCu1B9KzY2REIzXty3NJkGo+5wEx4=',
      locales: [
        {
          name: 'Arabic',
          localeCode: 'ar',
          langCode: 'ar',
          lang: 'ar'
        },
        {
          name: 'English US',
          localeCode: 'en-us',
          langCode: 'en_US',
          lang: 'en-us'
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
        }
      ],
      masterLanguage: 'en',
      src: src + '/assets/languages/strings.json',
      dest: src + '/assets/languages'
    },
    uglify: {
      mangle: true
    },
    ngannotate: {
      add: true,
      remove: false,
      'single_quotes': true
    },
    verifySpecs: {
      src: src + '/@(app)/**/!(*specs|*mock).js'
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
            'angular-locale_en-us,' +
            'angular-locale_fr,' +
            'angular-locale_zh-cn,' +
            '}.js'
        }
      },
      less: src + '/**/*.less',
      templates: src + '/**/*.html',
      test: src + '/app/**/*.specs.js'
    }
  }
};
