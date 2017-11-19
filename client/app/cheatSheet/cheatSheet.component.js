'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './cheatSheet.routes';

export class CheatSheetComponent {
  notesText = [];
  dragSrcEl = null;
  /*@ngInject*/
  constructor($http) {
    this.message = 'Hello';
    this.$http = $http;
  }
  $onInit() {
    this.$http.get('/api/notes')
      .then(response => {
        this.notesText = response.data;
        // console.log('Notes text component' + response.data);
      });
  }
}

export default angular.module('studyGenieApp.cheatSheet', [uiRouter])
  .config(routes)
  .component('cheatSheet', {
    template: require('./cheatSheet.html'),
    controller: CheatSheetComponent,
    controllerAs: 'cheatSheetCtrl'
  })
  .name;
