'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ngRoute',
  'ngGrid',
  'googlechart'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    // when('/admin', {
    //   templateUrl: '/admin/partials/adminIndex'
    // }).
    // when('/deptHead', {
    //   templateUrl: '/deptHead/partials/deptIndex'
    // }).
    // PUBLIC
    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'HomeCtrl'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrlNone'
    }).
    // ADMINISTRAION (PRESIDENT)
    when('/admin', {
      templateUrl: '/admin/partials/adminIndex',
      controller: 'AdminCtrl'
    }).
    when('/admin/goals', {
      templateUrl: '/admin/partials/goals',
      controller: 'GoalCtrl'
    }).
    // when('/admin/goalDetail/:id', {
    //   templateUrl: '/admin/partials/goalDetail',
    //   controller: 'GoalDetailCtrl'
    // }).
    when('/admin/reports', {
      templateUrl: '/admin/partials/reports',
      controller: 'AdminCtrl'
    }).
    // DEPARTMENT HEAD
    when('/deptHead', {
      templateUrl: '/deptHead/partials/deptIndex',
      controller: 'DeptCtrl'
    }).
    when('/deptHead/goalDetail/:id', {
      templateUrl: '/deptHead/partials/goalDetail',
      controller: 'GoalDetailCtrl'
    }).
    when('/deptHead/boardKpis', {
      templateUrl: '/deptHead/partials/boardKpis',
      controller: 'BoardKPICtrl'
    }).
    when('/deptHead/deptObjDetail/:id', {
      templateUrl: '/deptHead/partials/deptObjDetail',
      controller: 'ObjDetailCtrl'
    }).
    when('/deptHead/goalDetail/:id/kpis', {
      templateUrl: '/deptHead/partials/kpis',
      controller: 'GoalDetailCtrl'
    }).
    when('/deptHead/budget/:id', {
      templateUrl: '/deptHead/partials/budget',
      controller: 'ObjDetailCtrl'
    }).
    when('/deptHead/goalDetail/:id/objectives', {
      templateUrl: '/deptHead/partials/objectives',
      controller: 'GoalDetailCtrl'
    }).
    when('/deptHead/goalDetail/:id/activities', {
      templateUrl: '/deptHead/partials/activities',
      controller: 'GoalDetailCtrl'
    }).
    otherwise({
      redirectTo: '/view1'
    });

  $locationProvider.html5Mode(true);
});
