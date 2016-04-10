angular.module('app')
    .controller('AdminUpdatesController', ['$rootScope', '$scope', '$state', 'isLoggedIn', 'UpdateService',
        function($rootScope, $scope, $state, isLoggedIn, UpdateService) {

            $rootScope.title = null;
            $rootScope.subtitle = null;

            if (!isLoggedIn) {
                $state.go('login');
            }

            // Load updates
            $scope.updates = UpdateService.query();

            // Placeholder for new update
            $scope.newUpdate = {};

            // Add a new update
            $scope.add = function() {
                UpdateService.save($scope.newUpdate, function() {
                    $scope.updates = UpdateService.query();
                    $scope.newUpdate = {};
                });
            };

            // Delete an update
            $scope.deleteUpdate = function(_id) {
                UpdateService.delete({ _id: _id });
                _.remove($scope.updates, function(u) {
                    return u._id == _id;
                });
            }
        }]);