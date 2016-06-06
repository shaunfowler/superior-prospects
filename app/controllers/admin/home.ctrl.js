angular.module('app')
    .controller('AdminController', ['$rootScope', '$scope', '$state', 'isLoggedIn',
        function($rootScope, $scope, $state, isLoggedIn) {

            $rootScope.title = 'Administration';
            $rootScope.subtitle = null;

            if (!isLoggedIn) {
                $state.go('login');
            }

            $scope.logout = function() {
                // LoginService.logout(); // TODO
            }
        }]);