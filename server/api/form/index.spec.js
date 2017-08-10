'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var formCtrlStub = {
  index: 'formCtrl.index',
  show: 'formCtrl.show',
  create: 'formCtrl.create',
  upsert: 'formCtrl.upsert',
  patch: 'formCtrl.patch',
  destroy: 'formCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var formIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './form.controller': formCtrlStub
});

describe('Form API Router:', function() {
  it('should return an express router instance', function() {
    expect(formIndex).to.equal(routerStub);
  });

  describe('GET /api/forms', function() {
    it('should route to form.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'formCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/forms/:id', function() {
    it('should route to form.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'formCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/forms', function() {
    it('should route to form.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'formCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/forms/:id', function() {
    it('should route to form.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'formCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/forms/:id', function() {
    it('should route to form.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'formCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/forms/:id', function() {
    it('should route to form.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'formCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
