angular.module('app').factory('LocationService', ['$resource',
    function($resource) {
        return $resource('api/locations/:_id', {}, {
            allProperties: {
                url: 'api/locations/:_id/properties',
                method: 'GET',
                isArray: true
            },
            visibleProperties: {
                url: 'api/locations/:_id/properties/visible',
                method: 'GET',
                isArray: true
            },
            update: {
                method: 'PUT'
            }
        });
    }])
