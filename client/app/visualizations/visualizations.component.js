'use strict';
const angular = require('angular');
const Chart = require('angular-chart.js/angular-chart');
const uiRouter = require('angular-ui-router');

import routes from './visualizations.routes';

export class VisualizationsComponent {
  barChartlabels;
  barChartseries;
  barChartdata;
  radarChartlabels;
  radarChartdata;
  type;
  'ngInject';
  constructor() {
    // this.message = 'Hello';
    this.barChartlabels = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 6', 'User 7'];
    this.barChartseries = ['Users'];
    this.barChartdata = [
      [75, 56, 44, 33, 20, 13, 7]
    ];
    this.radarChartlabels = ['Java', 'Python', 'C#', 'C', 'Javascript', 'C++', 'Go'];

    this.radarChartdata = [
      [65, 59, 90, 81, 56, 55, 40]
    ];
    this.type = 'radar';
  }

  toggle = function() {
    this.type = this.type === 'polarArea' ? 'radar' : 'polarArea';
  };
}

export default angular.module('studyGenieApp.visualizations', [uiRouter, Chart])
  .config(routes, function(ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: false
    });
  })
  .component('visualizations', {
    template: require('./visualizations.html'),
    controller: VisualizationsComponent,
    controllerAs: 'visualizationsCtrl'
  })
  .name;
