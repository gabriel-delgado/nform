'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var controlCtrlStub = {
  index: 'controlCtrl.index',
  show: 'controlCtrl.show',
  create: 'controlCtrl.create',
  upsert: 'controlCtrl.upsert',
  patch: 'controlCtrl.patch',
  destroy: 'controlCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var controlIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './control.controller': controlCtrlStub
});

describe('Control API Router:', function() {
  it('should return an express router instance', function() {
    expect(controlIndex).to.equal(routerStub);
  });

  describe('GET /api/controls', function() {
    it('should route to control.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'controlCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/controls/:id', function() {
    it('should route to control.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'controlCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/controls', function() {
    it('should route to control.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'controlCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/controls/:id', function() {
    it('should route to control.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'controlCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/controls/:id', function() {
    it('should route to control.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'controlCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/controls/:id', function() {
    it('should route to control.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'controlCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
