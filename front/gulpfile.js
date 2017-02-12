var gulp = require('gulp');
var config = require('./gulp/config');
var constants = require('./gulp/constants');
var env = require('./gulp/env');
var utilities = require('./gulp/utilities/utilities');
var plugins = require('gulp-load-plugins')({
  scope: ['devDependencies']
});

function getTask(task) {
  return require('./gulp/tasks/' + task)(config, constants, env, gulp, plugins, utilities);
}

plugins.browserSync = require('browser-sync');
plugins.cleancss = require('gulp-clean-css');
plugins.del = require('del');
plugins.jshintStylish = require('jshint-stylish');
plugins.jscsStylish = require('gulp-jscs-stylish');
plugins.jsonTranslate = require('gulp-json-translator');
plugins.mergeStream = require('merge-stream');
//plugins.sass = require('gulp-sass');
plugins.source = require('vinyl-source-stream');
plugins.webpack = require('webpack');

gulp.task('assets-images', getTask('assets-images'));
gulp.task('assets-languages', getTask('assets-languages'));
gulp.task('assets-locales', getTask('assets-locales'));
gulp.task('browsersync', getTask('browsersync'));
gulp.task('clean', getTask('clean'));
gulp.task('fonts', getTask('fonts'));
gulp.task('lint', getTask('lint'));
gulp.task('markup', getTask('markup'));
gulp.task('browsersync-nosync', getTask('browsersync-nosync'));
gulp.task('styles', getTask('styles'));
gulp.task('translate-json', getTask('translate-json'));
gulp.task('version', getTask('version'));
gulp.task('watch', getTask('watch'));
gulp.task('webpack', getTask('webpack'));

gulp.task('dev-noserver', ['clean'], function() {
  gulp.start('version');
  gulp.start('assets-images');
  gulp.start('assets-languages');
  gulp.start('assets-locales');
  gulp.start('markup');
  gulp.start('styles');
  gulp.start('fonts');
  gulp.start('webpack');
  gulp.start('watch');
});

gulp.task('qa-server', ['dev-noserver'], function() {
  gulp.start('browsersync-nosync');
});

//This task builds the project and watches non-spec files.
gulp.task('dev', ['dev-noserver'], function() {
	gulp.start('browsersync');
});

//This task just builds the project normally.
gulp.task('default', ['clean'], function() {
  gulp.start('version');
  gulp.start('assets-images');
  gulp.start('assets-languages');
  gulp.start('assets-locales');
  gulp.start('markup');
  gulp.start('styles');
  gulp.start('fonts');
  gulp.start('webpack');
});
