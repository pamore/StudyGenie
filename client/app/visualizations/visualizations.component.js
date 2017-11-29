'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './visualizations.routes';

export class VisualizationsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('studyGenieApp.visualizations', [uiRouter])
  .config(routes)
  .component('visualizations', {
    template: require('./visualizations.html'),
    controller: VisualizationsComponent,
    controllerAs: 'visualizationsCtrl'
  })
  .name;
