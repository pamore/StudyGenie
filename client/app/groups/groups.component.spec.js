'use strict';

describe('Component: GroupsComponent', function() {
  // load the controller's module
  beforeEach(module('studyGenieApp.groups'));

  var GroupsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    GroupsComponent = $componentController('groups', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
