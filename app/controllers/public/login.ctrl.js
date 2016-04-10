angular.module('app')
    .controller('LoginController', ['$rootScope', '$scope', '$state', 'isLoggedIn',
        function($rootScope, $scope, $state, isLoggedIn) {

            $rootScope.title = "Login";
            $rootScope.subtitle = null;

            if (isLoggedIn) {
                $state.go('admin');
            }
        }]);