angular.module('app').factory('MediaService', ['$resource',
    function($resource) {
        return $resource('api/media/:_id');
    }]);