'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './groups.routes';

export class GroupsComponent {
  individualgroupText;
  currentUser;
  newGroupData;
  Modal;
  /*@ngInject*/
  constructor($http, Modal, Auth) {
    this.message = 'Hello';
    this.$http = $http;
    this.Modal = Modal;
    this.Auth = Auth;
  }

  $onInit() {
    this.$http.get('/api/studyGroups')
      .then(response => {
        this.groupText = response.data;
        let temp = this.groupText;
        this.individualgroupText = temp;
        console.log('text =' + this.individualgroupText[0].name);
      });
    this.Auth.getCurrentUser().then(response => {
      // Logged in, redirect to home
      //this.$state.go('dashboard');
      this.currentUser = response;
      console.log('user email', response.email);
    })
      .catch(err => {
        this.errors.login = err.message;
      });
  }

  openGroupModal() {
    let currentUser = this.currentUser;
    let http = this.$http;
    let openModal = this.Modal.confirm.delete(function(formData) {
      // formData contains the data collected in the modal
      this.newGroupData = formData;
      // //console.log('name=', formData.groupName);
      // console.log(formData.groupName);
      // console.log(formData.groupFocus);
      // console.log(formData.groupDescription);
      let groupObjNew = {};
      groupObjNew.name = this.newGroupData.groupName;
      groupObjNew.description = this.newGroupData.groupDescription;
      groupObjNew.domain = this.newGroupData.groupFocus;
      groupObjNew.members = [];
      let userData = {};
      console.log('user email', currentUser.email);
      userData.userID = currentUser.email;
      userData.user = currentUser.name;
      userData.timestamp = Date.now().toString();
      console.log('group obj=', groupObjNew);
      groupObjNew.members.push(userData);
      http.post('/api/studyGroups/', groupObjNew).then(response => {
        console.log('respose_new=', response.data);
      });
    });
    openModal('group');
  }
  joinGroup(groupObj) {
    var eligible = true;
    //check if userID in the StudyGroup
    for(var i = 0; i < groupObj.members.length; i++) {
      if(groupObj.members[i].userID == this.currentUser.email) {
        eligible = false;
        var temp = '.Group_' + groupObj._id;
        angular.element(document.querySelector(temp)).css('display', 'block');
        break;
      }
    }
    console.log('Group Id:', groupObj.name);
    if(eligible) {
      groupObj.members.push({'userID': this.currentUser.email, 'user': this.currentUser.name, 'timestamp': Date.now().toString()});
      console.log('Groups:', groupObj.members);
      //let body = JSON.stringify(groupObj);
      this.$http.put('/api/studyGroups/' + groupObj._id, groupObj).then(response => {
        console.log('respose=', response.data);
      });
    }
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
