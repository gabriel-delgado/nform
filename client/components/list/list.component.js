'use strict';
const angular = require('angular');

export class listComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('nformApp.list', [])
  .component('list', {
    template: require('./list.html'),
    bindings: { 
      columns: '<',
      items: '<'
    },
    controller: listComponent
  })
  .name;
