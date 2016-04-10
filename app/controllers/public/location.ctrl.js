angular.module('app')
    .controller('LocationController', ['$rootScope', '$scope', '$sce', '$state', 'LocationService',
        function($rootScope, $scope, $sce, $state, LocationService) {
            $scope.location = LocationService.get({ _id: $state.params.lid }, function(data) {
                $rootScope.title = data.name;
                $rootScope.subtitle = null;
                $scope.trustedHtml = $sce.trustAsHtml(data.body);
            });
            $scope.properties = LocationService.visibleProperties({ _id: $state.params.lid });
        }]);