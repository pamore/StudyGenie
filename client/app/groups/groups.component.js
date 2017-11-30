'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './groups.routes';

export class GroupsComponent {
  Modal;
  /*@ngInject*/
  constructor(Modal) {
    this.message = 'Hello';
    this.Modal = Modal;
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
