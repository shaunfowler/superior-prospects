angular.module('app')
    .controller('AdminLocationController', ['$rootScope', '$scope', '$state', 'isLoggedIn', 'LocationService',
        function($rootScope, $scope, $state, isLoggedIn, LocationService) {

            $rootScope.title = null;
            $rootScope.subtitle = null;

            if (!isLoggedIn) {
                $state.go('login');
            }

            // Editor options
            $scope.tinymceOptions = {
                menubar: false,
                minHeight: 400
            }

            // Load locations
            $scope.locations = LocationService.query();
            $scope.location = LocationService.get({ _id: $state.params.lid });

            // View a location on the public side
            $scope.viewLocation = function(id) {
                $state.go('location', { lid: id });
            }

            // Save a location
            $scope.saveLocation = function() {
                LocationService.update({ _id: $scope.location._id }, $scope.location);
            };

            // Delete a location
            $scope.deleteLocation = function(id) {
                if (confirm('Do you really want to delete ' + $scope.location.name + '?')) {
                    LocationService.delete({ _id: id }, function() {
                        $state.go('admin.locations', {}, { reload: true });
                    });
                }
            }
        }]);
