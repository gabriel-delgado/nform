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
  }

  loadActions() {
    this.$http.get('/api/actions')
      .then(response => {
        this.items = response.data;
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
