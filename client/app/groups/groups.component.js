'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './groups.routes';

export class GroupsComponent {
  individualgroupText;
  Modal;
  /*@ngInject*/
  constructor($http, Modal) {
    this.message = 'Hello';
    this.$http = $http;
    this.Modal = Modal;
  }

  $onInit() {
    this.$http.get('/api/studyGroups')
      .then(response => {
        this.groupText = response.data;
        let temp = this.groupText;
        this.individualgroupText = temp;
        console.log('text =' + this.individualgroupText[0].name);
      });
  }

  openGroupModal() {
    let openModal = this.Modal.confirm.delete(function() {
      // formData contains the data collected in the modal
      // console.log(formData.title);
      // console.log(formData.content);
      // console.log(note_id);
    });
    openModal('group');
  }
}

export default angular.module('studyGenieApp.groups', [uiRouter])
  .config(routes)
  .component('groups', {
    template: require('./groups.html'),
    controller: GroupsComponent,
    controllerAs: 'groupsCtrl'
  })
  .name;
