'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './actions.routes';

export class ActionsComponent {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.loadActions();
    this.isNewFormVisible = false;
    this.isVisibleMessage = false;

  }

  loadActions() {
    this.$http.get('/api/actions')
      .then(response => {
        this.items = response.data;
      });
  }

  displayNewForm() {
    this.isNewFormVisible = true;
  }

  cancel() {
    this.isNewFormVisible = false;
  }

  submit() {
    let data = {
      name: this.name,
      code: this.code,
      description: this.description
    };

    this.$http.post('/api/actions', data)
      .then(response => {
        console.log('Actions stored', response);
        this.successSubmit();
      });
  }

  displaySuccessMessage() {
    this.isVisibleMessage = true;
  }

  successSubmit() {
    this.cleanFields();
    this.displaySuccessMessage();
  }

  cleanFields() {
    this.name = '';
    this.code = '';
    this.description = '';
  }
}

export default angular.module('nformApp.actions', [uiRouter])
  .config(routes)
  .component('actions', {
    template: require('./actions.html'),
    controller: ActionsComponent
  })
  .name;
