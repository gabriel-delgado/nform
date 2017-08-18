'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('actions', {
      url: '/actions',
      template: '<actions></actions>'
    })
    .state('editAction', {
      url: '/actions/edit/:id',
      params: { id: null },
      template: '<edit-action></edit-action>'
    });
}
