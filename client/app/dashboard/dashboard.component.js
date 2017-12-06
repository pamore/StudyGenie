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
    this.notesText = [];
  }

  getCurrentUserNotes(currentUserEmail) {
    this.$http.get('/api/notes/author/' + currentUserEmail)
      .then(response => {
        this.currentUsernotesText = response.data;
      });
  }

  $onInit() {
    this.Auth.getCurrentUser().then(response => {
      // Logged in, redirect to home
      //this.$state.go('dashboard');
      this.currentUser = response;
      this.getCurrentUserNotes(this.currentUser.email);
      let interests = this.currentUser.interests === undefined ? '' : this.currentUser.interests;
      let coursework = this.currentUser.coursework === undefined ? '' : this.currentUser.coursework;
      let weakness = this.currentUser.weakness === undefined ? '' : this.currentUser.weakness;
      let searchstring = `${interests} ${coursework} ${weakness}`;
      // searchstring = searchstring.replace(/\s/g, '');
      if (searchstring === '' || searchstring === ' ' || searchstring === '  ') {
        searchstring = 'empty';
      }
      this.$http.get('/api/elasticsearch/search/' + searchstring)
        .then(res => {
          this.notesText = [];
          for (let i = 0; i < res.data.hits.hits.length; i++) {
            this.notesText.push(res.data.hits.hits[i]._source);
          }
        });
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
    let openModal = this.Modal.confirm.delete(function (formData, note_id) {
      // formData contains the data collected in the modal
      // console.log(formData.title);
      // console.log(formData.content);
      // console.log(note_id);
      note.title = formData.title;
      note.content = formData.content;

      if(!currUserTemp.notesViewd){currUserTemp.notesViewd = [note_id];}else{currUserTemp.notesViewd.push(note_id);}
      if(!formData.rating) {

        //Not rated but viewedby user
      } else {
        console.log('Rating=', formData.rating);
        noteOpened.ratingList.push({'rating': formData.rating, 'timestamp': Date.now().toString()});
        note.ratingList = noteOpened.ratingList;

        if(!noteOpened.avgRating) {note.avgRating = formData.rating;}
        else { note.avgRating = ((parseInt(noteOpened.avgRating, 10) + parseInt(formData.rating, 10)) / (2.0));}

        //user viewd & rated note
        if(!currUserTemp.notesRated){currUserTemp.notesRated = [note_id];}
        else{currUserTemp.notesRated.push(note_id);}
      }
      if (formData.favouriteNote) {
        //note is marked fav
        console.log('Marked favourite!');
        if (!noteOpened.markedFavCount) {
          note.markedFavCount = 1;
        } else {
          note.markedFavCount = parseInt(noteOpened.markedFavCount, 10) + 1;
        }
        if(!currUserTemp.notesFavourite){currUserTemp.notesFavourite = [note_id];} else{currUserTemp.notesFavourite.push(note_id);}
        if(!currUserTemp.authorFavourite){currUserTemp.authorFavourite = [note.author_id];} else{currUserTemp.authorFavourite.push(note.author_id);}
      }

      http.put(`/api/notes/${note_id}`, note).then(response => {
        console.log(response.data);
        //Update user
        //this.currentUser = currUserTemp;
        http.post('/api/users/updateUser', currUserTemp)
          .then(res => {
            console.log(res);
            // console.log('Notes text component' + response.data);
          });
      });
    });
    openModal('note', note.n_id, note.title, note.content, note.author_id, note.avgRating, currentUser.email);
  }

  openAddModal() {
    let openModal = this.Modal.confirm.delete(function (formData) {
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
