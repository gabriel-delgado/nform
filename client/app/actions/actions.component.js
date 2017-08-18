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
    this.message = '';
  }

  loadActions() {
    this.$http.get('/api/actions')
      .then(response => {
        this.items = response.data;
      });
  }

  displayNewForm() {
    this.isNewFormVisible = true;
    this.isVisibleMessage = false;
  }

  cancel() {
    this.isNewFormVisible = false;
    this.isVisibleMessage = false;
  }

  submit() {
    let data = {
      name: this.name,
      code: this.code,
      description: this.description
    };

    this.$http.post('/api/actions', data)
      .then(response => {
        console.log(response);
        this.successSubmit();
        this.loadActions();
      });
  }

  displaySuccessMessage() {
    this.isVisibleMessage = true;
  }

  successSubmit() {
    this.cleanFields();
    this.message = 'You successfully store the action data.';
    this.displaySuccessMessage();
  }

  cleanFields() {
    this.name = '';
    this.code = '';
    this.description = '';
  }

  deleteAction() {
    angular.forEach(this.items, value => {
      if(value.selected) {
        this.$http.delete(`/api/actions/${value._id}`)
          .then(response => {
            console.log(response);
            this.isVisibleMessage = true;
            this.message = 'You successfully delete the action data.';
            this.loadActions();
          });
      }
    });
  }
}

export default angular.module('nformApp.actions', [uiRouter])
  .config(routes)
  .component('actions', {
    template: require('./actions.html'),
    controller: ActionsComponent
  })
  .name;
