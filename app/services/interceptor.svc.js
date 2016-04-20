angular.module('app').factory('InterceptorService', ['$q', '$window', '$location', '$log',
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
    }]);