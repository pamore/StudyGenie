'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './dashboard.routes';

export class DashboardComponent {
  $http;
  Modal;
  individualnotesText;
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
        let temp = this.notesText;
        this.individualnotesText = temp.slice(5);
      });
  }

  openNote(note) {
    var http = this.$http;
    console.log('note opened with id =' + note.n_id);
    let openModal = this.Modal.confirm.delete(function(formData, note_id) {
      // formData contains the data collected in the modal
      // console.log(formData.title);
      // console.log(formData.content);
      // console.log(note_id);
      note.title = formData.title;
      note.content = formData.content;
      http.put(`/api/notes/${note_id}`, note).then(response => {
        console.log(response.data);
      });
    });
    openModal('note', note.n_id, note.title, note.content);
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
