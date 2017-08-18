'use strict';
const angular = require('angular');

export class EditAction {
  /*@ngInject*/
  constructor($http, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.isVisibleMessage = false;
    this.message = '';
    this.loadItem();
  }

  loadItem() {
    this.id = this.$stateParams.id;
    this.$http.get(`/api/actions/${this.id}`)
      .then(response => {
        console.log(response);
        this.name = response.data.name;
        this.code = response.data.code;
        this.description = response.data.description;
      });
  }

  cancel() {
    this.isVisibleMessage = false;
  }

  submit() {
    let data = {
      name: this.name,
      code: this.code,
      description: this.description
    };

    this.$http.put(`/api/actions/${this.id}`, data)
      .then(response => {
        console.log('Actions stored', response);
        this.successSubmit();
      });
  }

  displaySuccessMessage() {
    this.isVisibleMessage = true;
  }

  successSubmit() {
    this.message = 'You successfully store the action data.';
    this.displaySuccessMessage();
  }
}

export default angular.module('nformApp.editAction', [])
  .component('editAction', {
    template: require('./edit.html'),
    bindings: {},
    controller: EditAction
  })
  .name;
