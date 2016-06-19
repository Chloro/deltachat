module.exports = /*@ngInject*/ function(
    $locale,
    $scope,
    $timeout,
    $translate,
    alertModalService,
    localeService
) {

  $scope.date = new Date();
  $scope.demoTabs = [
    {
      tabName: 'Demo Tab 1',
      routeName: 'demoViewOne'
    },
    {
      tabName: 'Demo Tab 2',
      routeName: 'demoViewTwo'
    },
    {
      tabName: 'Demo Tab 3',
      routeName: 'demoViewOne'
    },
    {
      tabName: 'Demo Tab 4',
      routeName: 'demoViewTwo'
    },
    {
      tabName: 'Demo Tab 5',
      routeName: 'demoViewOne'
    },
    {
      tabName: 'Demo Tab 6',
      routeName: 'demoViewTwo'
    },
    {
      tabName: 'Demo Tab 7',
      routeName: 'demoViewOne'
    }
  ];

  var tick = function () {
    $scope.date = new Date();
    $timeout(tick, 1000);
  };

  $timeout(tick, 1000);

  $scope.locale = localeService.getLocale();
  $scope.locales = localeService.getLocales();

  $scope.updateLocale = function (locale) {
    localeService.setLocale(locale.localeCode);
  };

  $scope.openAlertModal = function(alertType, isBlocking, duration) {
    $translate(['demo.alertModalDemo1', 'demo.alertModalDemo2']).then(function(translations) {
      alertModalService.openAlertModal(
        [
          translations['demo.alertModalDemo1'],
          translations['demo.alertModalDemo2']
        ], alertType, isBlocking, duration);
    });
  };
};
