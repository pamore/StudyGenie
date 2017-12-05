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
        // let promises = [];
        // for(let i = 0; i < response.data.length / 10 ; i++) {
        //   promises.push(this.$http.post('/api/elasticsearch/addAllDocuments', {notes: response.data.slice(i, i + 10)})
        //     .then(res => {
        //       console.log(`${res}added documents successfully`);
        //     }));
        // }
        // promises.push(this.$http.post('/api/elasticsearch/addAllDocuments', {notes: response.data.slice(response.data.length - response.data.length % 10, response.data.length)})
        //   .then(res => {
        //     console.log(`${res}added documents successfully`);
        //   }));
        // // console.log(bulkAddDocs);
        // Promise.all(promises).then(function(values) {
        //   console.log(values);
        //   // res.json(values);
        // });
        this.$http.post('/api/elasticsearch/addAllDocuments', {notes: response.data})
          .then(response => {
            console.log('added documents successfully');
          });
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

  openAddModal() {
    let openModal = this.Modal.confirm.delete(function(formData) {
      // formData contains the data collected in the modal
      // console.log(formData.title);
      // console.log(formData.content
    });
    openModal('add_note');
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
