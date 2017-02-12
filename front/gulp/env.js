var nodeEnv = require('yargs').argv.env || 'prod';
var version = require('../package.json').version;

module.exports = {
  env: nodeEnv,
  isProd: 'prod' === nodeEnv,
  minify: true,
  sourceMaps: false,
  version: version,
  watch: ['dev'].indexOf(nodeEnv) > -1
};
