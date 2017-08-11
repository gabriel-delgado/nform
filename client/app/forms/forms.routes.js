'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('forms', {
      url: '/forms',
      template: '<forms></forms>'
    });
}
