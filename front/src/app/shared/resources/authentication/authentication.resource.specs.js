var resource = require('./authentication.resource.js');
var endpointConstant = require('../../constants/endpoint.constant.js');

describe('localeService', function() {
  var $resource;
  var instance;

  beforeEach(function() {
    $resource = jasmine.createSpy();
    instance = resource(
      $resource,
      endpointConstant
    );
  });

  it('On init it should call $resource with defining params', function() {
    expect($resource).toHaveBeenCalledWith('https://apigateway-v1-sit.qa.aws.chotel.com/v1/agent-account/login',
        { username : '@username', password : '@password' });
  });
  
});
