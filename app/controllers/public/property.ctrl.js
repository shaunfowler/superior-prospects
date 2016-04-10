angular.module('app')
    .controller('PropertyController', ['$rootScope', '$scope', '$sce', '$state', 'PropertyService',
        function($rootScope, $scope, $sce, $state, PropertyService) {
            $scope.property = PropertyService.get({ _id: $state.params.pid }, function(data) {
                $rootScope.title = data.name;
                $rootScope.subtitle = data.description;
                $scope.trustedHtml = $sce.trustAsHtml(data.body);
            });
            $scope.media = PropertyService.media({ _id: $state.params.pid });
        }]);