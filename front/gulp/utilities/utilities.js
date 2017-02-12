this.readyToLint = true;

function checkEncoding(plugins) {
  var isUtf8 = require('is-utf8');
  var through = require('through2');

  return through.obj(function(file, enc, cb) {
    if (!isUtf8(file.contents)) {
      plugins.util.log(plugins.util.colors.red('[ERROR] file is not encoded in UTF-8:'));
      plugins.util.log(plugins.util.colors.yellow(file.path));
      this.readyToLint = false;
    }
    cb();
  });
}

function getFilesize(filedir) {
  var fs = require('fs');
  var prettyBytes = require('pretty-bytes');

  var filestats = fs.statSync(filedir);
  var filesize = filestats.size;
  return prettyBytes(filesize);
}

function isReadyToLint() {
  return this.readyToLint;
}

module.exports = {
  checkEncoding: checkEncoding,
  getFilesize: getFilesize,
  isReadyToLint: isReadyToLint
};
