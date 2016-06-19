var es = require('event-stream');
var fs = require('fs');
var path = require('path');
var Stream = require('stream');

var exists = fs.existsSync;

module.exports = function(config, constants, env, gulp, plugins, utilities) {
  return function() {

    var missingFiles = [];
    var stream = new Stream.Transform({objectMode: true});

    plugins.util.log(plugins.util.colors.yellow('Verifying spec files exist...'));

    stream._transform = function(file, unused, cb) {
      var testPath = path.resolve(
        config.paths.src,
        path.relative(config.paths.src, file.path)
      ).replace(/\.js$/, '.specs.js');
      var expectedLongRequirePath = path
        .relative(testPath, file.path)
        .substring(3);
      var expectedShortRequirePath = expectedLongRequirePath
        .substring(0, expectedLongRequirePath.length - 3);
      var indent = '  ';
      var reason;

      expectedLongRequirePath = 'require(\'./' + expectedLongRequirePath + '\'';
      expectedShortRequirePath = 'require(\'./' + expectedShortRequirePath + '\'';

      function findReasonToReject() {
        var contents;

        //Skip the following files.  We don't bother testing these.
        if (
          !constants.APP_SPEC.test(testPath) &&
          !constants.CONSTANT_SPEC.test(testPath) &&
          !constants.INDEX_SPEC.test(testPath) &&
          !constants.STATES_SPEC.test(testPath) &&
          !constants.VERSION_SPEC.test(testPath)
        ) {
          if (!exists(testPath)) {
            plugins.util.log(plugins.util.colors.red('Creating spec file for ' + file.path));
            plugins.util.log(plugins.util.colors.red('  at ->  ' + testPath));

            fs.writeFileSync(
              testPath,
              [
                'var factory = ' + expectedLongRequirePath + ');',
                '',
                'describe(\'' + file.path + '\', function() {',
                '  it(\'NEEDS TO HAVE SPECS WRITTEN\', function() {',
                '    expect(\'tests to be written for\')',
                '      .to.equal(\'' + file.path + '\');',
                '  });',
                '});',
                ''
              ].join('\n')
            );
          } else {
            contents = fs.readFileSync(testPath, 'utf8');
            if (
              contents.indexOf(expectedShortRequirePath) < 0 &&
              contents.indexOf(expectedLongRequirePath) < 0
            ) {
              return [
                '',
                'The following spec file did not require it\'s source file:',
                indent + indent + testPath,
                indent + 'Expected to see one of the following statements:',
                indent + indent + expectedShortRequirePath,
                indent + indent + expectedLongRequirePath
              ].join('\n');
            }
          }
        }
      }

      reason = findReasonToReject();

      if (reason) {
        missingFiles.push(reason);
      }

      cb(null);
    };
    return gulp.src(config.tasks.verifySpecs.src)
      .pipe(stream)
      .pipe(es.wait(function() {
        if (missingFiles.length) {
          missingFiles.forEach(function(missingFile) {
            console.log(missingFile);
          });
          process.exit(1);
        }
      }));
  };
};
