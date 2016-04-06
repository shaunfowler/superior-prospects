angular.module('app')

    .factory('InterceptorService', ['$q', '$window', '$location', '$log',
        function($q, $window, $location, $log) {

            var errors = [400, 404, 405, 500, 503];

            var _responseError = function(rejection) {
                if (rejection.status === 401 && rejection.config.url.indexOf('/api') > -1) {
                    $log.warn('401 received from API, redirecting to login page', rejection.config.url);
                    $location.path('/#/login');
                }
                if (errors.indexOf(rejection.status) > -1) {
                    $log.error('HTTP Error:', rejection.status, ' ',
                        rejection.statusText, '[', rejection.config.url, ']');
                }
                return $q.reject(rejection);
            }

            return {
                responseError: _responseError
            };
        }])

    .factory('LocationService', ['$resource',
        function($resource) {
            return $resource('api/locations/:safename', {}, {
                allProperties: {
                    url: 'api/locations/:safename/properties',
                    method: 'GET',
                    isArray: true
                },
                visibleProperties: {
                    url: 'api/locations/:safename/properties/visible',
                    method: 'GET',
                    isArray: true
                },
                update: {
                    method: 'PUT'
                }
            });
        }])

    .factory('PropertyService', ['$resource',
        function($resource) {
            return $resource('api/properties/:safename', {}, {
                visible: {
                    url: 'api/properties/visible',
                    method: 'GET',
                    isArray: true
                },
                media: {
                    url: 'api/properties/:safename/media',
                    method: 'GET',
                    isArray: true
                },
                update: {
                    method: 'PUT'
                }
            });
        }])

    .factory('MediaService', ['$resource',
        function($resource) {
            return $resource('api/media/:safename');
        }])

    .factory('UpdateService', ['$resource',
        function($resource) {
            return $resource('api/updates/:safename');
        }])

    .factory('LoginHelper', ['$http',
        function($http) {
            return {
                ok: function() {
                    return $http.get('/user').then(function() {
                        return true;
                    }, function() {
                        return false;
                    })
                }
            }
        }]);
