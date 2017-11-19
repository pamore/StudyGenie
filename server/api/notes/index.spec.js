'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var notesCtrlStub = {
  index: 'notesCtrl.index',
  show: 'notesCtrl.show',
  create: 'notesCtrl.create',
  upsert: 'notesCtrl.upsert',
  patch: 'notesCtrl.patch',
  destroy: 'notesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var notesIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './notes.controller': notesCtrlStub
});

describe('Notes API Router:', function() {
  it('should return an express router instance', function() {
    expect(notesIndex).to.equal(routerStub);
  });

  describe('GET /api/notes', function() {
    it('should route to notes.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'notesCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/notes/:id', function() {
    it('should route to notes.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'notesCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/notes', function() {
    it('should route to notes.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'notesCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/notes/:id', function() {
    it('should route to notes.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'notesCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/notes/:id', function() {
    it('should route to notes.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'notesCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/notes/:id', function() {
    it('should route to notes.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'notesCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
