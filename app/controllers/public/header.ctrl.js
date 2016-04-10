angular.module('app')
    .controller('HeaderController', ['$rootScope', '$scope', '$state', 'LocationService',
        function($rootScope, $scope, $state, LocationService) {
            $scope.locations = LocationService.query();
            $rootScope.$state = $state;
        }]);