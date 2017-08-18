'use strict';
const angular = require('angular');

export class listComponent {
  /*@ngInject*/
  constructor(Modal, $state) {
    this.columns = [];
    this.Modal = Modal;
    this.$state = $state;
  }

  getColumns(items) {
    if(items && this.columns.length === 0) {
      let index = this.items.length - 1;
      angular.forEach(this.items[index], (value, key) => {
        if(key.indexOf('__') === -1) {
          this.columns.push(key);
        }
      });
    }
  }

  isString(value) {
    return angular.isString(value);
  }

  isObject(value) {
    return angular.isObject(value);
  }

  $doCheck() {
    this.getColumns(this.items);
  }

  selectItems(event) {
    angular.forEach(this.items, value => {
      value.selected = event.target.checked;
    });
  }

  openDeleteModal() {
    let testDelete = this.Modal.confirm.delete(() => {
      this.onDeleteItem();
    });

    testDelete(this.name, 'Ok');
  }

  editItem(data) {
    this.$state.go('editAction', { id: data._id });
  }
}

export default angular.module('nformApp.list', [])
  .component('list', {
    template: require('./list.html'),
    bindings: {
      items: '=',
      onClickNew: '&',
      onDeleteItem: '&',
      name: '@'
    },
    controller: listComponent
  })
  .name;
