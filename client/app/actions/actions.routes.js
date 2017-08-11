'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('actions', {
      url: '/actions',
      template: '<actions></actions>'
    });
}
