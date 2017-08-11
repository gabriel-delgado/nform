'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './forms.routes';

export class FormsComponent {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit () {
    this.$http.get('/api/forms')
      .then((response) => {
        this.forms = response.data;
    });
  }
}

export default angular.module('nformApp.forms', [uiRouter])
  .config(routes)
  .component('forms', {
    template: require('./forms.html'),
    controller: FormsComponent
  })
  .name;
