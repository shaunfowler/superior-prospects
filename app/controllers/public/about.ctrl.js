angular.module('app')
    .controller('AboutController', ['$rootScope', '$scope',
        function($rootScope, $scope) {
            $rootScope.title = 'About';
            $rootScope.subtitle = null;
        }]);