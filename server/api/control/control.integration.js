'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newControl;
var newAction;

describe('Control API:', function() {
  describe('GET /api/controls', function() {
    var controls;

    beforeEach(function(done) {
      request(app)
        .get('/api/controls')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          controls = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(controls).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/controls', function() {
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

    beforeEach(function(done) {
      request(app)
        .post('/api/controls')
        .send({
          name: 'radio',
          position: { x: 1, y: 1},
          behaviors: [{event: 'click', action: newAction._id}],
          description: 'This is the brand new control!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newControl = res.body;
          done();
        });
    });

    it('should respond with the newly created control', function() {
      expect(newControl.name).to.equal('radio');
      expect(newControl.position.x).to.equal(1);
      expect(newControl.position.y).to.equal(1);
      expect(newControl.behaviors.length).to.equal(1);
      expect(newControl.behaviors[0].event).to.equal('click');
      expect(newControl.behaviors[0].action).to.equal(newAction._id);
      expect(newControl.description).to.equal('This is the brand new control!!!');
    });
  });

  describe('GET /api/controls/:id', function() {
    var control;

    beforeEach(function(done) {
      request(app)
        .get(`/api/controls/${newControl._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          control = res.body;
          done();
        });
    });

    afterEach(function() {
      control = {};
    });

    it('should respond with the requested control', function() {
      expect(control.name).to.equal('radio');
      expect(control.description).to.equal('This is the brand new control!!!');
    });
  });

  describe('PUT /api/controls/:id', function() {
    var updatedControl;

    beforeEach(function(done) {
      request(app)
        .put(`/api/controls/${newControl._id}`)
        .send({
          name: 'button',
          position: { x: 2, y: 1},
          behaviors: [{event: 'click', action: newAction._id}],
          description: 'This is the updated control!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedControl = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedControl = {};
    });

    it('should respond with the updated control', function() {
      expect(updatedControl.name).to.equal('button');
      expect(updatedControl.position.x).to.equal(2);
      expect(updatedControl.position.y).to.equal(1);
      expect(updatedControl.behaviors.length).to.equal(1);
      expect(updatedControl.behaviors[0].event).to.equal('click');
      expect(updatedControl.behaviors[0].action).to.equal(newAction._id);
      expect(updatedControl.description).to.equal('This is the updated control!!!');
    });

    it('should respond with the updated control on a subsequent GET', function(done) {
      request(app)
        .get(`/api/controls/${newControl._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let control = res.body;

          expect(control.name).to.equal('button');
          expect(control.description).to.equal('This is the updated control!!!');

          done();
        });
    });
  });

  describe('PATCH /api/controls/:id', function() {
    var patchedControl;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/controls/${newControl._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'checkbox' },
          { op: 'replace', path: '/description', value: 'This is the patched control!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedControl = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedControl = {};
    });

    it('should respond with the patched control', function() {
      expect(patchedControl.name).to.equal('checkbox');
      expect(patchedControl.description).to.equal('This is the patched control!!!');
    });
  });

  describe('DELETE /api/controls/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/controls/${newControl._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when control does not exist', function(done) {
      request(app)
        .delete(`/api/controls/${newControl._id}`)
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
