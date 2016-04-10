angular.module('app')
    .controller('ContactController', ['$rootScope', '$scope',
        function($rootScope, $scope) {
            $rootScope.title = 'Contact';
            $rootScope.subtitle = null;
        }]);