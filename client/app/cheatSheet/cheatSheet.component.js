'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
const dragDrop = require('angular-drag-drop');
import routes from './cheatSheet.routes';

export class CheatSheetComponent {
  $http;
  notesText = [];
  cheatSheetList = [];
  dragSrcEl = null;
  Modal;
  selected;
  constructor($http, Modal) {
    'ngInject';
    this.message = 'Hello';
    this.$http = $http;
    this.Modal = Modal;
    this.selected = 1;
  }
  $onInit() {
    this.$http.get('/api/notes')
      .then(response => {
        this.notesText = response.data;
        // console.log('Notes text component' + response.data);
      });
  }
  deleteList(selected) {
    this.selected = selected;
    this.cheatSheetList = [];
  }
  onDrop(event, dragdata) {
    this.cheatSheetList.push(dragdata);
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
// CheatSheetComponent.$inject = ['$http', dragDrop, uiRouter];

export default angular.module('studyGenieApp.cheatSheet', [uiRouter, dragDrop])
  .config(routes)
  .component('cheatSheet', {
    template: require('./cheatSheet.html'),
    controller: CheatSheetComponent,
    controllerAs: 'cheatSheetCtrl'
  })
  .name;
