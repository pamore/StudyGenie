'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './dashboard.routes';

export class DashboardComponent {
  $http;
  Modal;
  individualnotesText;
  currentUsernotesText;
  /*@ngInject*/
  constructor($http, Modal, Auth) {
    this.message = 'Hello';
    this.$http = $http;
    this.Modal = Modal;
    this.Auth = Auth;
  }
  getCurrentUserNotes(currentUserEmail) {
    this.$http.get('/api/notes/author/' + currentUserEmail)
      .then(response => {
        this.currentUsernotesText = response.data;
      });
  }
  $onInit() {
    this.$http.get('/api/notes')
      .then(response => {
        this.notesText = response.data;
        let temp = this.notesText;
        this.individualnotesText = temp.slice(5);
        //console.log('all notes=', this.individualnotesText);
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
          .then(res => {
            //console.log('added documents successfully', res);
          });
      });
    this.Auth.getCurrentUser().then(response => {
      // Logged in, redirect to home
      //this.$state.go('dashboard');
      this.currentUser = response;
      this.getCurrentUserNotes(this.currentUser.email);
    })
      .catch(err => {
        this.errors.login = err.message;
      });
  }

  openNote(note) {
    var currentUser = this.currentUser;
    var http = this.$http;
    var noteOpened = note;
    var currUserTemp = this.currentUser;
    console.log('note opened with id =' + note.n_id);
    let openModal = this.Modal.confirm.delete(function(formData, note_id) {
      // formData contains the data collected in the modal
      // console.log(formData.title);
      // console.log(formData.content);
      // console.log(note_id);
      note.title = formData.title;
      note.content = formData.content;

      if(!formData.rating) {
        //Not rated but viewedby user
      } else {
        console.log('Rating=', formData.rating);
        noteOpened.ratingList.push({'rating': formData.rating, 'timestamp': Date.now().toString()});
        note.ratingList = noteOpened.ratingList;
        if(!noteOpened.avgRating) {
          note.avgRating = formData.rating;
        } else {
          note.avgRating = ((parseInt(noteOpened.avgRating, 10) + parseInt(formData.rating, 10)) / (2.0));
        }
        //user viewd & rated note
      }
      if(formData.favouriteNote) {
        //note is marked fav
        console.log('Marked favourite!');
        if(!noteOpened.markedFavCount) {
          note.markedFavCount = 1;
        } else {
          note.markedFavCount = parseInt(noteOpened.markedFavCount, 10) + 1;
        }
      }

      http.put(`/api/notes/${note_id}`, note).then(response => {
        console.log(response.data);
      });
    });
    openModal('note', note.n_id, note.title, note.content, note.author_id, note.avgRating, currentUser.email);
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
