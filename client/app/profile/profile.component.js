'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './profile.routes';

export class ProfileComponent {
  /*@ngInject*/
  Auth;
  $http;
  currentUser;
  successFlag;
  constructor(Auth, $http) {
    'ngInject';
    this.successFlag = false;
    this.Auth = Auth;
    this.$http = $http;
    this.Auth.getCurrentUser().then(response => {
      this.currentUser = response;
    });
  }

  createOrUpdateUserProfile() {
    // console.log(this.currentUser);
    console.log('****');
    this.$http.post('/api/users/updateUser', this.currentUser)
      .then(response => {
        console.log(response);
        this.successFlag = true;
        // console.log('Notes text component' + response.data);
      });
  }
}

export default angular.module('studyGenieApp.profile', [uiRouter])
  .config(routes)
  .component('profile', {
    template: require('./profile.html'),
    controller: ProfileComponent,
    controllerAs: 'profileCtrl'
  })
  .name;
