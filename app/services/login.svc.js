angular.module('app').factory('LoginHelper', ['$http',
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
