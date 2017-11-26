'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './dashboard.routes';

export class DashboardComponent {
  $http;
  Modal;

  /*@ngInject*/
  constructor($http, Modal) {
    this.message = 'Hello';
    this.$http = $http;
    this.Modal = Modal;
  }
  $onInit() {
    this.$http.get('/api/notes')
      .then(response => {
        this.notesText = response.data;
        // console.log('Notes text component' + response.data);
      });
  }
  openNote(note) {
    console.log('noteeee=' + note.n_id);
    let openModal = this.Modal.confirm.delete(() => console.log('modal'));
    openModal();
  }
}
export default angular.module('studyGenieApp.dashboard', [uiRouter])
  .config(routes)
  .component('dashboard', {
    template: require('./dashboard.html'),
    controller: DashboardComponent
    // controllerAs: 'dashboardCtrl'
  })
  .name;
