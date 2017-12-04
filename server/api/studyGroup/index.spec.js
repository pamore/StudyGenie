'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var studyGroupCtrlStub = {
  index: 'studyGroupCtrl.index',
  show: 'studyGroupCtrl.show',
  create: 'studyGroupCtrl.create',
  upsert: 'studyGroupCtrl.upsert',
  patch: 'studyGroupCtrl.patch',
  destroy: 'studyGroupCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var studyGroupIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './studyGroup.controller': studyGroupCtrlStub
});

describe('StudyGroup API Router:', function() {
  it('should return an express router instance', function() {
    expect(studyGroupIndex).to.equal(routerStub);
  });

  describe('GET /api/studyGroups', function() {
    it('should route to studyGroup.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'studyGroupCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/studyGroups/:id', function() {
    it('should route to studyGroup.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'studyGroupCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/studyGroups', function() {
    it('should route to studyGroup.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'studyGroupCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/studyGroups/:id', function() {
    it('should route to studyGroup.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'studyGroupCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/studyGroups/:id', function() {
    it('should route to studyGroup.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'studyGroupCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/studyGroups/:id', function() {
    it('should route to studyGroup.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'studyGroupCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
