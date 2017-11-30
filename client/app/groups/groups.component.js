'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './groups.routes';

export class GroupsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
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
