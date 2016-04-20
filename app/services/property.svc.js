angular.module('app').factory('PropertyService', ['$resource',
    function($resource) {
        return $resource('api/properties/:_id', {}, {
            visible: {
                url: 'api/properties/visible',
                method: 'GET',
                isArray: true
            },
            media: {
                url: 'api/properties/:_id/media',
                method: 'GET',
                isArray: true
            },
            update: {
                method: 'PUT'
            }
        });
    }]);