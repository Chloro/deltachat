var gulp = require('gulp');
var config = require('./gulp/config');
var constants = require('./gulp/constants');
var env = require('./gulp/env');
var utilities = require('./gulp/utilities');
var plugins = require('gulp-load-plugins')({
  scope: ['devDependencies']
});

function getTask(task) {
  return require('./gulp/tasks/' + task)(config, constants, env, gulp, plugins, utilities);
}

plugins.browserify = require('browserify');
plugins.browserSync = require('browser-sync');
plugins.cleancss = require('gulp-clean-css');
plugins.del = require('del');
plugins.jshintStylish = require('jshint-stylish');
plugins.jscsStylish = require('gulp-jscs-stylish');
plugins.jsonTranslate = require('gulp-json-translator');
plugins.karmaReal = require('karma');
plugins.ngannotate = require('gulp-ng-annotate');
plugins.source = require('vinyl-source-stream');
plugins.watchify = require('watchify');

gulp.task('assets-images', getTask('assets-images'));
gulp.task('assets-languages', getTask('assets-languages'));
gulp.task('assets-locales', getTask('assets-locales'));
gulp.task('browserify', ['lint'], getTask('browserify'));
gulp.task('browserify-and-watchify', ['lint'], getTask('browserify-and-watchify'));
gulp.task('browser-sync', getTask('browser-sync'));
gulp.task('clean', getTask('clean'));
gulp.task('fonts', getTask('fonts'));
gulp.task('hooks', getTask('hooks'));
gulp.task('hook-lint', getTask('hook-lint'));
gulp.task('lint', getTask('lint'));
gulp.task('markup', getTask('markup'));
gulp.task('styles', getTask('styles'));
gulp.task('test', ['verifySpecs'], getTask('test'));
gulp.task('translate-json', getTask('translate-json'));
gulp.task('verifySpecs', getTask('verifySpecs'));
gulp.task('version', getTask('version'));
gulp.task('watch', getTask('watch'));

gulp.task('dev-nosync', ['clean'], function() {
  gulp.start('hooks');
  gulp.start('version');
  gulp.start('assets-images');
  gulp.start('assets-languages');
  gulp.start('assets-locales');
  gulp.start('markup');
  gulp.start('styles');
  gulp.start('fonts');
  gulp.start('browserify-and-watchify');
  gulp.start('watch');
});

//This task builds the project and watches non-spec files.
gulp.task('dev', ['dev-nosync'], function() {
	gulp.start('browser-sync');
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
  gulp.start('browserify');
});
