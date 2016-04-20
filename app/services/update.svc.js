angular.module('app').factory('UpdateService', ['$resource',
    function($resource) {
        return $resource('api/updates/:_id');
    }]);