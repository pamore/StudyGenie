'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('cheatSheet', {
      url: '/cheatSheet',
      template: '<cheat-sheet></cheat-sheet>'
    });
}
