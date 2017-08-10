'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newField;
var newAction;

describe('Field API:', function() {
  describe('GET /api/fields', function() {
    var fields;

    beforeEach(function(done) {
      request(app)
        .get('/api/fields')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          fields = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(fields).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/fields', function() {
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
        .post('/api/fields')
        .send({
          name: 'input',
          description: 'This is the brand new field!!!',
          properties: {x:1, y:1, sizeX:1, sizeY:1},
          type: 'input',
          behaviors: [{event: 'click', action: newAction._id}]
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newField = res.body;
          done();
        });
    });

    it('should respond with the newly created field', function() {
      expect(newField.name).to.equal('input');
      expect(newField.properties.x).to.equal(1);
      expect(newField.properties.y).to.equal(1);
      expect(newField.properties.sizeX).to.equal(1);
      expect(newField.properties.sizeY).to.equal(1);
      expect(newField.type).to.equal('input');
      expect(newField.behaviors.length).to.equal(1);
      expect(newField.behaviors[0].event).to.equal('click');
      expect(newField.behaviors[0].action).to.equal(newAction._id);
      expect(newField.description).to.equal('This is the brand new field!!!');
    });
  });

  describe('GET /api/fields/:id', function() {
    var field;

    beforeEach(function(done) {
      request(app)
        .get(`/api/fields/${newField._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          field = res.body;
          done();
        });
    });

    afterEach(function() {
      field = {};
    });

    it('should respond with the requested field', function() {
      expect(field.name).to.equal('input');
      expect(field.description).to.equal('This is the brand new field!!!');
    });
  });

  describe('PUT /api/fields/:id', function() {
    var updatedField;

    beforeEach(function(done) {
      request(app)
        .put(`/api/fields/${newField._id}`)
        .send({
          name: 'combo',
          description: 'This is the updated field!!!',
          properties: {x:1, y:1, sizeX:1, sizeY:1},
          type: 'select',
          behaviors: [{event: 'click', action: newAction._id}]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedField = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedField = {};
    });

    it('should respond with the updated field', function() {
      expect(updatedField.name).to.equal('combo');
      expect(updatedField.description).to.equal('This is the updated field!!!');
      expect(updatedField.type).to.equal('select');
    });

    it('should respond with the updated field on a subsequent GET', function(done) {
      request(app)
        .get(`/api/fields/${newField._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let field = res.body;

          expect(field.name).to.equal('combo');
          expect(field.description).to.equal('This is the updated field!!!');

          done();
        });
    });
  });

  describe('PATCH /api/fields/:id', function() {
    var patchedField;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/fields/${newField._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'list' },
          { op: 'replace', path: '/description', value: 'This is the patched field!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedField = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedField = {};
    });

    it('should respond with the patched field', function() {
      expect(patchedField.name).to.equal('list');
      expect(patchedField.description).to.equal('This is the patched field!!!');
    });
  });

  describe('DELETE /api/fields/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/fields/${newField._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when field does not exist', function(done) {
      request(app)
        .delete(`/api/fields/${newField._id}`)
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
