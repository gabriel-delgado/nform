'use strict';

import actions from './actions.component';

describe('Component: ActionsComponent', function() {
  // load the controller's module
  beforeEach(angular.mock.module(actions));

  var ActionsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ActionsComponent = $componentController('actions', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
