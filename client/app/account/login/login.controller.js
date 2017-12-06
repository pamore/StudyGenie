'use strict';
// @flow

type User = {
  name: string;
  email: string;
  password: string;
};

export default class LoginController {
  user: User = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;
  Auth;
  $state;
  $http;
  loadingFlag;
  /*@ngInject*/
  constructor(Auth, $state, $http) {
    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
    this.loadingFlag = false;
  }

  login(form) {
    this.submitted = true;
    this.loadingFlag = true;
    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          this.$http.get('/api/notes')
            .then(response => {
              // this.notesText = response.data;
              // let temp = this.notesText;
              // this.individualnotesText = temp.slice(5);
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
                  console.log('added documents successfully', res);
                  this.loadingFlag = false;
                  this.$state.go('dashboard');
                });
            });


          // Logged in, redirect to home
          // this.$state.go('dashboard');
        })
        .catch(err => {
          this.loadingFlag = false;
          this.errors.login = err.message;
        });
    }
  }
}
