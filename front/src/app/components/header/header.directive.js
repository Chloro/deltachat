module.exports = function() {
  return {
    controller: 'headerController',
    scope: {
      showSideNav: '=?'
    },
    templateUrl: '/components/header/header.html'
  };
};
