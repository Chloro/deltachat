var exec = require('child_process').exec;

function runCommand(command) {
  return function (cb) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  }
}

module.exports = {
  runCommand: runCommand
};
