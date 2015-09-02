'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])

	.factory('Goals', ['$resource', function($resource){
        return $resource('/api/goals/:id', {id: '@id'}, { // pull url from server
            'update': { method:'PUT' }
        });
    }])

	.factory('Objectives', ['$resource', function($resource){
        return $resource('/api/objectives/:id', {id: '@id'}, { // pull url from server
            'update': { method:'PUT' }
        });
    }])

    .factory('Users', ['$resource', function($resource){
        return $resource('/api/users/:id', {id: '@id'}, { // pull url from server
            'update': { method:'PUT' }
        });
    }])

    .factory('Budgets', ['$resource', function($resource){
        return $resource('/api/Budgets', {id: '@id'}, { // pull url from server
            'update': { method:'PUT' }
        });
    }])

    .factory('UserData', ['$resource', function($resource){
        return $resource('/api/userData', {id: '@id'}, { // pull url from server
            'update': { method:'PUT' }
        });
    }])

    // make isArray true for update
    .factory('ProgReports', ['$resource', function($resource){
        return $resource('/api/progReps/:id', {id: '@id'}, { // pull url from server
            'update': { method:'PUT' }
        });
    }])

    .factory('BoardKPIs', ['$resource', function($resource){
        return $resource('/api/boardkpis/:id', {id: '@id'}, { // pull url from server
            'update': { method:'PUT' }
        });
    }])

    