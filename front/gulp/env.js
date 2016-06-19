var nodeEnv = require('yargs').argv.env || 'prod';
var version = require('../package.json').version;

module.exports = {
  env: nodeEnv,
  isProd: 'prod' === nodeEnv,
  minify: ['prod', 'qa'].indexOf(nodeEnv) > -1,
  sourceMaps: ['dev', 'local'].indexOf(nodeEnv) > -1,
  version: version
};