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
    startMongo: {
      prod: 'gnome-terminal -e "mongod --config ' + root + '/database/config/production/mongod.conf --fork"',
      local: 'gnome-terminal -e "mongod --config' + root + '/database/config/local/mongod.conf --fork"'
    },
    stopMongo: {
      prod: 'mongo --eval "use admin; db.shutdownServer();"',
      local: 'mongo --eval "use admin; db.shutdownServer();"'
    },
    startServer: {
      pm2: {
        name: 'Deltachat',
        script: root + '/server.js'
      },
      start: 'node server.js'
    }
  }
};
