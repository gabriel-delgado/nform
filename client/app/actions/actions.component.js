'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './actions.routes';

export class ActionsComponent {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.message = 'Hello';
    this.columns = ['Id', 'Name', 'Parameters', 'Result', 'Description'];
  }

  $onInit () {
    this.loadActions();
  }

  loadActions () {
    this.$http.get('/api/actions')
      .then((response) => {
        this.items = response.data;
        console.log('ITEMS', this.items);
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
