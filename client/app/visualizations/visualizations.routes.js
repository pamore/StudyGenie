'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('visualizations', {
      url: '/visualizations',
      template: '<visualizations></visualizations>'
    });
}
