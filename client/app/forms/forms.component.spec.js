'use strict';

import forms from './forms.component';

describe('Component: FormsComponent', function() {
  // load the controller's module
  beforeEach(angular.mock.module(forms));

  var FormsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    FormsComponent = $componentController('forms', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
