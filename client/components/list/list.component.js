'use strict';
const angular = require('angular');

import Modal from '../modal/modal.service';

export class listComponent {
  /*@ngInject*/
  constructor(Modal) {
    this.columns = [];
    this.Modal = Modal;
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

  open(size, parentSelector) {
    let user = {name: 'gabriel'};
    let text1 = 'text1';
    let text2 = 'text2';
    let text3 = 'text3';

    let testDelete = this.Modal.confirm.delete( result => {
      console.log('RESULT', result);
    });

    testDelete(text1, text2, text3);
  }
}

export default angular.module('nformApp.list', [])
  .component('list', {
    template: require('./list.html'),
    bindings: {
      items: '<',
      onClickNew: '&'
    },
    controller: listComponent
  })
  .name;
