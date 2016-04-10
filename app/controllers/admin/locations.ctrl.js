angular.module('app')
    .controller('AdminLocationsController', ['$rootScope', '$scope', '$state', 'isLoggedIn', 'LocationService',
        function($rootScope, $scope, $state, isLoggedIn, LocationService) {

            $rootScope.title = null;
            $rootScope.subtitle = null;

            if (!isLoggedIn) {
                $state.go('login');
            }

            // Load locations
            $scope.locations = LocationService.query();

            // Add a new location
            $scope.add = function(location) {
                LocationService.save(location, function(result) {
                    $scope.newLocation = {};
                    $scope.locations = LocationService.query();
                    $state.go('admin.locations.edit', { lid: result._id });
                });
            };
        }]);