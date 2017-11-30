'use strict';
const angular = require('angular');
const Chart = require('angular-chart.js/angular-chart');
const vis = require('vis');
const uiRouter = require('angular-ui-router');
import routes from './visualizations.routes';

export class VisualizationsComponent {
  barChartlabels;
  barChartcolors;
  // barChartseries;
  barChartdata;
  radarChartlabels;
  radarChartdata;
  verticaldata;
  verticallabels;
  verticalcolors;
  networkdata;
  networkedges;
  networkcontainer;
  networknodes;
  networkoptions;
  network;
  type;
  'ngInject';
  constructor() {
    // this.message = 'Hello';
    this.barChartlabels = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 6', 'User 7'];
    this.barChartcolors = ['rgb(250,2,0)', 'rgb(250,109,33)', 'rgb(154,154,154)', 'rgb(159,204,0)', 'rgb(250,109,33)', 'rgb(154,154,154)', 'rgb(154,154,154)'];
    // this.barChartseries = ['Users'];
    this.barChartdata = [75, 56, 44, 33, 20, 13, 7];

    this.radarChartlabels = ['Java', 'Python', 'C#', 'C', 'Javascript', 'C++', 'Go'];
    this.radarChartdata = [
      [65, 59, 90, 81, 56, 55, 40]
    ];
    this.type = 'radar';

    this.verticallabels = ['TestUser1', 'TestUser1', 'TestUser2', 'TestUser3', 'TestUser4', 'TestUser5', 'TestUser6'];
    this.verticalcolors = ['rgb(250,2,10)', 'rgb(200,109,33)', 'rgb(104,154,154)', 'rgb(159,20,0)', 'rgb(25,190,33)', 'rgb(154,15,154)', 'rgb(154,154,15)'];
    this.verticaldata = [25, 16, 13, 9, 7, 6, 3];

    this.networknodes = new vis.DataSet([
      {id: 1, label: 'TestUser 1'},
      {id: 2, label: 'TestUser 2'},
      {id: 3, label: 'TestUser 3'},
      {id: 4, label: 'TestUser 4'},
      {id: 5, label: 'TestUser 5'}
    ]);
    this.networkedges = new vis.DataSet([
      {from: 1, to: 2},
      {from: 2, to: 5},
      {from: 3, to: 5},
      {from: 3, to: 4},
      {from: 3, to: 2},
      {from: 2, to: 4}
    ]);
    this.networkcontainer = document.getElementById('mynetwork');
    this.networkdata = {
      nodes: this.networknodes,
      edges: this.networkedges
    };
    this.networkoptions = {
      interaction: {
        navigationButtons: true
      }
    };
    this.network = new vis.Network(this.networkcontainer, this.networkdata, this.networkoptions);
  }

  toggle = function() {
    this.type = this.type === 'polarArea' ? 'radar' : 'polarArea';
  };
}

export default angular.module('studyGenieApp.visualizations', [uiRouter, Chart])
  .config(routes, function(ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
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
