var gulp = require('gulp');
var config = require('./gulp/config');
var env = require('./gulp/env');
var plugins = require('gulp-load-plugins')({
  scope: ['devDependencies']
});
var utilities = require('./gulp/utilities');

function getTask(task) {
  return require('./gulp/tasks/' + task)(config, env, gulp, plugins, utilities);
}

plugins.del = require('del');
plugins.pm2 = require('pm2');

gulp.task('clean', getTask('clean'));
gulp.task('version', getTask('version'));
gulp.task('start-server', getTask('start-server'));

//This task launches the server
gulp.task('start', ['clean'], function() {
  gulp.start('version');
  gulp.start('start-server');
});
