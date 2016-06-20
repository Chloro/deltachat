module.exports = function(config, env, gulp, plugins, utilities) {
  return function() {
    plugins.util.log(plugins.util.colors.yellow('Starting server...'));
    plugins.pm2.connect(function(error){
      if (error) {
        plugins.util.log(plugins.util.colors.red('Error starting PM2'));
        process.exit(2);
      }
      plugins.pm2.start(config.tasks.startServer.pm2, function(error){
        plugins.util.log(plugins.util.colors.red('Error starting PM2'));
        plugins.pm2.disconnect();
        if (error) throw error;
      });
    });

    //utilities.runCommand(config.tasks.startServer.start);
  };
};
