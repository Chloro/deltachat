module.exports = /*@ngInject*/ function(
    $locationProvider,
    $stateProvider,
    $urlRouterProvider,
    routeConstant,
    stateConstant
) {
  
  $stateProvider
    .state(stateConstant.ACCOUNT, {
      authenticate: true,
      url: routeConstant.ACCOUNT,
      views: {
        main: {
          templateUrl: '/pages/account/account.html'
        }
      }
    })
    .state('demo', {
      authenticate: false,
      url: routeConstant.DEMO,
      views: {
        main: {
          controller: 'demoController',
          templateUrl: '/pages/demo/demo.html'
        }
      }
    })
    .state(stateConstant.TAB_DEMO_VIEW_ONE, {
      url: routeConstant.TAB_DEMO_VIEW_ONE,
      templateUrl: '/pages/demo/tab-demo-view-one/tab-demo-view-one.html'
    })
    .state(stateConstant.TAB_DEMO_VIEW_TWO, {
      url: routeConstant.TAB_DEMO_VIEW_TWO,
      templateUrl: '/pages/demo/tab-demo-view-two/tab-demo-view-two.html'
    })
    .state(stateConstant.HELP, {
      authenticate: true,
      url: routeConstant.HELP,
      views: {
        main: {
          templateUrl: '/pages/help/help.html'
        }
      }
    })
    .state(stateConstant.HOTEL_GENERAL, {
      authenticate: true,
      url: routeConstant.HOTEL_GENERAL,
      views: {
        main: {
          templateUrl: '/pages/hotel-general/hotel-general.html'
        }
      }
    })
    .state(stateConstant.NOTIFICATIONS, {
      authenticate: true,
      url: routeConstant.NOTIFICATIONS,
      views: {
        main: {
          templateUrl: '/pages/notifications/notifications.html'
        }
      }
    })
    .state(stateConstant.OPERATIONS, {
      authenticate: true,
      url: routeConstant.OPERATIONS,
      views: {
        main: {
          templateUrl: '/pages/operations/operations.html'
        }
      }
    })
    .state(stateConstant.ORGANIZATION, {
      authenticate: true,
      url: routeConstant.ORGANIZATION,
      views: {
        main: {
          templateUrl: '/pages/organization/organization.html'
        }
      }
    })
    .state(stateConstant.PARTNER, {
      authenticate: true,
      url: routeConstant.PARTNER,
      views: {
        main: {
          controller: 'partnerController',
          templateUrl: '/pages/partner/partner.html'
        }
      }
    })
    .state(stateConstant.PARTNER_CONFIGURATION, {
      url: routeConstant.PARTNER_CONFIGURATION,
      views: {
        main: {
          templateUrl: '/pages/partner-config/partner-config.html'
        }
      }
    })
    .state(stateConstant.SIGN_IN, {
      authenticate: false,
      url: routeConstant.SIGN_IN,
      views: {
        main: {
          controller: 'signInController',
          templateUrl: '/pages/sign-in/sign-in.html'
        }
      }
    })
    .state(stateConstant.SLEEP_ROOM, {
      authenticate: true,
      url: routeConstant.SLEEP_ROOM,
      views: {
        main: {
          templateUrl: '/pages/sleep-room/sleep-room.html'
        }
      }
    });
  //$locationProvider.html5Mode(true); Set this after apache is setup to always send index.html
  $urlRouterProvider.otherwise(routeConstant.SIGN_IN);
};