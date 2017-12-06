'use strict';
const angular = require('angular');
const Chart = require('angular-chart.js/angular-chart');
const vis = require('vis');
const uiRouter = require('angular-ui-router');
import routes from './visualizations.routes';

export class VisualizationsComponent {
  barChartlabels;
  barChartcolors;
  barChartseries;
  barChartdata;
  radarChartlabels;
  radarChartdata;
  verticaldata;
  verticallabels;
  verticalcolors;
  networkdata;
  networkedges;
  networkcontainer;
  networknodes;
  networkoptions;
  network;
  studyGroupData;
  allUserData;
  type;
  /*@ngInject*/
  constructor($http, Auth) {
    // this.message = 'Hello';
    this.message = 'Hello';
    this.$http = $http;
    this.Auth = Auth;
    this.getData();
  }
  getData() {
    //Study Group data
    let http = this.$http;
    http.get('/api/studyGroups')
      .then(response => {
        this.studyGroupData = response.data;
        console.log('group data=', this.studyGroupData);
        //All User Data
        http.get('/api/users/all')
          .then(res => {
            this.allUserData = res.data;
            console.log('user data=', this.allUserData);
            this.visualizationMethod();
          });
      });
  }
  visualizationMethod() {
    //console.log('length() = ', this.allUserData.length());
    let favAuthorsData = {};
    let networkDataSet = [];
    let userContribution = [];
    let userRatingsCount = [];
    let userViewsCount = [];
    let userFavNoteCount = [];
    let userAuthFavCount = [];
    let userCreatedNotesCount = [];
    let userNamesContribution = [];
    for(var i = 0; i < this.allUserData.length; i++) {
      userNamesContribution.push(this.allUserData[i].name);
      userRatingsCount.push(this.allUserData[i].notesRated.length);
      userViewsCount.push(this.allUserData[i].notesViewd.length);
      userFavNoteCount.push(this.allUserData[i].notesFavourite.length);
      userAuthFavCount.push(this.allUserData[i].authorFavourite.length);
      userCreatedNotesCount.push(this.allUserData[i].notesCreated.length);

      networkDataSet.push({id: this.allUserData[i].email, label: this.allUserData[i].name});
      for(var j = 0; j < this.allUserData[i].authorFavourite.length; j++) {
        if(!favAuthorsData[this.allUserData[i].authorFavourite[j]]) {
          favAuthorsData[this.allUserData[i].authorFavourite[j]] = 1;
        } else {favAuthorsData[this.allUserData[i].authorFavourite[j]] += 1;}
      }
    }
    console.log('favAuthorsData=', favAuthorsData);
    userContribution.push(userRatingsCount);
    userContribution.push(userViewsCount);
    userContribution.push(userFavNoteCount);
    userContribution.push(userAuthFavCount);
    userContribution.push(userCreatedNotesCount);

    if(!userNamesContribution) {userNamesContribution = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 6', 'User 7'];}
    if(!userContribution) {userContribution = [[75, 56, 44, 33, 20, 13, 7], [15, 6, 74, 23, 10, 53, 27], [5, 76, 14, 53, 20, 13, 87], [25, 26, 74, 13, 70, 73, 57], [25, 36, 14, 3, 60, 43, 27]];}
    this.barChartlabels = userNamesContribution;
    this.barChartcolors = ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
    this.barChartseries = ['# Notes Rated', '# Notes Viewed', '# Notes marked Favourite', '# Authors marked Favourite', '# Notes Created'];
    this.barChartdata = userContribution;

    this.radarChartlabels = ['Java', 'Python', 'C#', 'C', 'Javascript', 'C++', 'Go'];
    this.radarChartdata = [
      [65, 59, 90, 81, 56, 55, 40]
    ];
    this.type = 'radar';
    this.verticallabels = [];
    this.verticaldata = [];
    if(!favAuthorsData) {
      this.verticallabels = ['TestUser1', 'TestUser1', 'TestUser2', 'TestUser3', 'TestUser4', 'TestUser5', 'TestUser6'];
      this.verticaldata = [15, 26, 13, 9, 17, 2, 5];
    } else {
      for(var keyName in favAuthorsData) {
        this.verticallabels.push('UserID ' + keyName.toString());
        this.verticaldata.push(favAuthorsData[parseInt(keyName, 10)]);
      }
    }
    this.verticalcolors = ['rgb(250,2,10)', 'rgb(200,109,33)', 'rgb(104,154,154)', 'rgb(159,20,0)', 'rgb(25,190,33)', 'rgb(154,15,154)', 'rgb(154,154,15)'];


    let networkDataEdges = [];
    for(i = 0; i < this.studyGroupData.length; i++) {
      for(j = 0; j < this.studyGroupData[i].members.length; j++) {
        for(var k = 0; k < this.studyGroupData[i].members.length; k++) {
          var member1 = this.studyGroupData[i].members[j];
          var member2 = this.studyGroupData[i].members[k];
          if(member1.userID != member2.userID) {
            networkDataEdges.push({from: member1.userID, to: member2.userID});
          }
        }
      }
    }
    console.log('networkDataSet=', networkDataSet);
    console.log('networkDataEdges=', networkDataEdges);

    this.networknodes = new vis.DataSet(networkDataSet);
    this.networkedges = new vis.DataSet(networkDataEdges);
    this.networkcontainer = document.getElementById('mynetwork');
    this.networkdata = {
      nodes: this.networknodes,
      edges: this.networkedges
    };
    this.networkoptions = {
      interaction: {
        navigationButtons: true
      }
    };
    this.network = new vis.Network(this.networkcontainer, this.networkdata, this.networkoptions);
  }

  toggle = function() {
    this.type = this.type === 'polarArea' ? 'radar' : 'polarArea';
  };
}

export default angular.module('studyGenieApp.visualizations', [uiRouter, Chart])
  .config(routes, function(ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: false
    });
  })
  .component('visualizations', {
    template: require('./visualizations.html'),
    controller: VisualizationsComponent,
    controllerAs: 'visualizationsCtrl'
  })
  .name;
