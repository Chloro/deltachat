var fs = require('fs');
var prettyBytes = require('pretty-bytes');

function getFilesize(filedir) {
  var filestats = fs.statSync(filedir);
  var filesize = filestats.size;
  return prettyBytes(filesize);
}

module.exports = {
  getFilesize: getFilesize
};
