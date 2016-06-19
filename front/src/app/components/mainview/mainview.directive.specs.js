var directive = require('./mainview.directive.js');

describe('mainview.directive', function() {
  var instance;

  function createInstance() {
    instance = directive();
  }

  beforeEach(angular.mock.inject(function () {
    createInstance();
  }));

  it('Should set the correct template url', function(){
    expect(instance.templateUrl).toEqual( '/components/mainview/mainview.html');
  });

});
