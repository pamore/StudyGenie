'use strict';

describe('Component: VisualizationsComponent', function() {
  // load the controller's module
  beforeEach(module('studyGenieApp.visualizations'));

  var VisualizationsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    VisualizationsComponent = $componentController('visualizations', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
