'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newAction;

describe('Action API:', function() {
  describe('GET /api/actions', function() {
    var actions;

    beforeEach(function(done) {
      request(app)
        .get('/api/actions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          actions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(actions).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/actions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/actions')
        .send({
          function: { name: 'test', parameters: ['a', 'b'], result: 'c'},
          description: 'This is a test function'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAction = res.body;
          done();
        });
    });

    it('should respond with the newly created action', function() {
      expect(newAction.function.name).to.equal('test');
      expect(newAction.description).to.equal('This is a test function');
    });
  });

  describe('GET /api/actions/:id', function() {
    var action;

    beforeEach(function(done) {
      request(app)
        .get(`/api/actions/${newAction._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          action = res.body;
          done();
        });
    });

    afterEach(function() {
      action = {};
    });

    it('should respond with the requested action', function() {
      expect(action.function.name).to.equal('test');
      expect(action.description).to.equal('This is a test function');
    });
  });

  describe('PUT /api/actions/:id', function() {
    var updatedAction;

    beforeEach(function(done) {
      request(app)
        .put(`/api/actions/${newAction._id}`)
        .send({
          function:  { name: 'updatedtest', parameters: ['b'], result: 'd'},
          description: 'update test description'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAction = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAction = {};
    });

    it('should respond with the updated action', function() {
      expect(updatedAction.function.name).to.equal('updatedtest');
      expect(updatedAction.function.result).to.equal('d');
      expect(updatedAction.description).to.equal('update test description');
    });

    it('should respond with the updated action on a subsequent GET', function(done) {
      request(app)
        .get(`/api/actions/${newAction._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let action = res.body;

          expect(action.function.name).to.equal('updatedtest');
          expect(action.description).to.equal('update test description');

          done();
        });
    });
  });

  describe('PATCH /api/actions/:id', function() {
    var patchedAction;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/actions/${newAction._id}`)
        .send([
          { op: 'replace', path: '/function', value: {name: 'replacetest'} },
          { op: 'replace', path: '/description', value: 'replace description test' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedAction = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedAction = {};
    });

    it('should respond with the patched action', function() {
      expect(patchedAction.function.name).to.equal('replacetest');
      expect(patchedAction.description).to.equal('replace description test');
    });
  });

  describe('DELETE /api/actions/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/actions/${newAction._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when action does not exist', function(done) {
      request(app)
        .delete(`/api/actions/${newAction._id}`)
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
