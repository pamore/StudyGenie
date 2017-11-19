'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newNotes;

describe('Notes API:', function() {
  describe('GET /api/notes', function() {
    var notess;

    beforeEach(function(done) {
      request(app)
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          notess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(notess).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/notes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/notes')
        .send({
          name: 'New Notes',
          info: 'This is the brand new notes!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newNotes = res.body;
          done();
        });
    });

    it('should respond with the newly created notes', function() {
      expect(newNotes.name).to.equal('New Notes');
      expect(newNotes.info).to.equal('This is the brand new notes!!!');
    });
  });

  describe('GET /api/notes/:id', function() {
    var notes;

    beforeEach(function(done) {
      request(app)
        .get(`/api/notes/${newNotes._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          notes = res.body;
          done();
        });
    });

    afterEach(function() {
      notes = {};
    });

    it('should respond with the requested notes', function() {
      expect(notes.name).to.equal('New Notes');
      expect(notes.info).to.equal('This is the brand new notes!!!');
    });
  });

  describe('PUT /api/notes/:id', function() {
    var updatedNotes;

    beforeEach(function(done) {
      request(app)
        .put(`/api/notes/${newNotes._id}`)
        .send({
          name: 'Updated Notes',
          info: 'This is the updated notes!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedNotes = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNotes = {};
    });

    it('should respond with the updated notes', function() {
      expect(updatedNotes.name).to.equal('Updated Notes');
      expect(updatedNotes.info).to.equal('This is the updated notes!!!');
    });

    it('should respond with the updated notes on a subsequent GET', function(done) {
      request(app)
        .get(`/api/notes/${newNotes._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let notes = res.body;

          expect(notes.name).to.equal('Updated Notes');
          expect(notes.info).to.equal('This is the updated notes!!!');

          done();
        });
    });
  });

  describe('PATCH /api/notes/:id', function() {
    var patchedNotes;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/notes/${newNotes._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Notes' },
          { op: 'replace', path: '/info', value: 'This is the patched notes!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedNotes = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedNotes = {};
    });

    it('should respond with the patched notes', function() {
      expect(patchedNotes.name).to.equal('Patched Notes');
      expect(patchedNotes.info).to.equal('This is the patched notes!!!');
    });
  });

  describe('DELETE /api/notes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/notes/${newNotes._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when notes does not exist', function(done) {
      request(app)
        .delete(`/api/notes/${newNotes._id}`)
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
