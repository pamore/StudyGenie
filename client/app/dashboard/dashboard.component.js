'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './dashboard.routes';
import Modal from '../../components/modal/modal.service';
// import Modal from '../../components/modal/modal.service';

export class DashboardComponent {
  $http;
  // modalService;
  notesText = [];

  /*@ngInject*/
  constructor($http) {
    this.message = 'Hello';
    this.$http = $http;
    this.modalService = Modal;
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
    // this.modalService.open(note).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // });
  }
  // getDismissReason(reason: any): string {
  //   if(reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if(reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
}

export default angular.module('studyGenieApp.dashboard', [uiRouter])
  .config(routes)
  .component('dashboard', {
    template: require('./dashboard.html'),
    controller: DashboardComponent
    // controllerAs: 'dashboardCtrl'
  })
  .name;
