angular.module('app')
    .controller('HomeController', ['$rootScope', '$scope', 'UpdateService', 'PropertyService',
        function($rootScope, $scope, UpdateService, PropertyService) {
            $rootScope.title = 'News and updates';
            $rootScope.subtitle = null;
            $rootScope.updates = UpdateService.query();
            $scope.properties = PropertyService.visible();
        }]);