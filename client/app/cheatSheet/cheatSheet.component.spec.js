'use strict';

describe('Component: CheatSheetComponent', function() {
  // load the controller's module
  beforeEach(module('studyGenieApp.cheatSheet'));

  var CheatSheetComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CheatSheetComponent = $componentController('cheatSheet', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
