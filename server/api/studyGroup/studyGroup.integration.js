'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newStudyGroup;

describe('StudyGroup API:', function() {
  describe('GET /api/studyGroups', function() {
    var studyGroups;

    beforeEach(function(done) {
      request(app)
        .get('/api/studyGroups')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          studyGroups = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(studyGroups).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/studyGroups', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/studyGroups')
        .send({
          name: 'New StudyGroup',
          info: 'This is the brand new studyGroup!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newStudyGroup = res.body;
          done();
        });
    });

    it('should respond with the newly created studyGroup', function() {
      expect(newStudyGroup.name).to.equal('New StudyGroup');
      expect(newStudyGroup.info).to.equal('This is the brand new studyGroup!!!');
    });
  });

  describe('GET /api/studyGroups/:id', function() {
    var studyGroup;

    beforeEach(function(done) {
      request(app)
        .get(`/api/studyGroups/${newStudyGroup._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          studyGroup = res.body;
          done();
        });
    });

    afterEach(function() {
      studyGroup = {};
    });

    it('should respond with the requested studyGroup', function() {
      expect(studyGroup.name).to.equal('New StudyGroup');
      expect(studyGroup.info).to.equal('This is the brand new studyGroup!!!');
    });
  });

  describe('PUT /api/studyGroups/:id', function() {
    var updatedStudyGroup;

    beforeEach(function(done) {
      request(app)
        .put(`/api/studyGroups/${newStudyGroup._id}`)
        .send({
          name: 'Updated StudyGroup',
          info: 'This is the updated studyGroup!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedStudyGroup = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStudyGroup = {};
    });

    it('should respond with the updated studyGroup', function() {
      expect(updatedStudyGroup.name).to.equal('Updated StudyGroup');
      expect(updatedStudyGroup.info).to.equal('This is the updated studyGroup!!!');
    });

    it('should respond with the updated studyGroup on a subsequent GET', function(done) {
      request(app)
        .get(`/api/studyGroups/${newStudyGroup._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let studyGroup = res.body;

          expect(studyGroup.name).to.equal('Updated StudyGroup');
          expect(studyGroup.info).to.equal('This is the updated studyGroup!!!');

          done();
        });
    });
  });

  describe('PATCH /api/studyGroups/:id', function() {
    var patchedStudyGroup;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/studyGroups/${newStudyGroup._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched StudyGroup' },
          { op: 'replace', path: '/info', value: 'This is the patched studyGroup!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedStudyGroup = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedStudyGroup = {};
    });

    it('should respond with the patched studyGroup', function() {
      expect(patchedStudyGroup.name).to.equal('Patched StudyGroup');
      expect(patchedStudyGroup.info).to.equal('This is the patched studyGroup!!!');
    });
  });

  describe('DELETE /api/studyGroups/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/studyGroups/${newStudyGroup._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when studyGroup does not exist', function(done) {
      request(app)
        .delete(`/api/studyGroups/${newStudyGroup._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
