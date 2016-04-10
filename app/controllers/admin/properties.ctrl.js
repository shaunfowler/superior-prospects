angular.module('app')
    .controller('AdminPropertiesController', ['$rootScope', '$scope', '$state', 'isLoggedIn', 'PropertyService', 'LocationService',
        function($rootScope, $scope, $state, isLoggedIn, PropertyService, LocationService) {

            $rootScope.title = null;
            $rootScope.subtitle = null;

            if (!isLoggedIn) {
                $state.go('login');
            }

            // Load everything
            $scope.properties = PropertyService.query();
            $scope.locations = LocationService.query();

            // Placeholder for new property
            $scope.newProperty = {};

            // Watch for changes on the location drop down
            $scope.locationSelectOptionChanged = function(locationId) {
                $scope.newProperty.locationRefId = locationId;
            };

            // Add a new property
            $scope.add = function() {
                PropertyService.save($scope.newProperty, function(result) {
                    $scope.properties = PropertyService.query();
                    $state.go('admin.properties.edit', { pid: result._id });
                });
            };
        }]);