'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('groups', {
      url: '/groups',
      template: '<groups></groups>'
    });
}
