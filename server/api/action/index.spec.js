'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var actionCtrlStub = {
  index: 'actionCtrl.index',
  show: 'actionCtrl.show',
  create: 'actionCtrl.create',
  upsert: 'actionCtrl.upsert',
  patch: 'actionCtrl.patch',
  destroy: 'actionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var actionIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './action.controller': actionCtrlStub
});

describe('Action API Router:', function() {
  it('should return an express router instance', function() {
    expect(actionIndex).to.equal(routerStub);
  });

  describe('GET /api/actions', function() {
    it('should route to action.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'actionCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/actions/:id', function() {
    it('should route to action.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'actionCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/actions', function() {
    it('should route to action.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'actionCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/actions/:id', function() {
    it('should route to action.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'actionCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/actions/:id', function() {
    it('should route to action.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'actionCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/actions/:id', function() {
    it('should route to action.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'actionCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
