var resolve = require('path').resolve;
var root = resolve(__dirname, '..');
var version = require('../package.json').version;
var env = require('./env');

module.exports = {
  app: {
    name: 'Deltachat-api',
    root: root,
    version: version
  },
  tasks: {
    version: {
      dest: root + '/app/version.js'
    },
    startServer: {
      pm2: {
        name: 'Deltachat',
        // script: root + '/server.js'
        script: 'server.js'
      },
      start: 'node server.js'
    }
  }
};
