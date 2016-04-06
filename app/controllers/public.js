angular.module('app')

    .controller('HeaderController', ['$rootScope', '$scope', '$state', 'LocationService',
        function($rootScope, $scope, $state, LocationService) {
            $scope.locations = LocationService.query();
            $rootScope.$state = $state;
        }])

    .controller('HomeController', ['$rootScope', '$scope', 'UpdateService', 'PropertyService',
        function($rootScope, $scope, UpdateService, PropertyService) {
            $rootScope.title = 'News and updates';
            $rootScope.subtitle = null;
            $rootScope.updates = UpdateService.query();
            $scope.properties = PropertyService.visible();
        }])

    .controller('LocationController', ['$rootScope', '$scope', '$sce', '$state', 'LocationService',
        function($rootScope, $scope, $sce, $state, LocationService) {
            $scope.location = LocationService.get({ safename: $state.params.lid }, function(data) {
                $rootScope.title = data.name;
                $rootScope.subtitle = null;
                $scope.trustedHtml = $sce.trustAsHtml(data.body);
            });
            $scope.properties = LocationService.visibleProperties({ safename: $state.params.lid });
        }])

    .controller('PropertyController', ['$rootScope', '$scope', '$sce', '$state', 'PropertyService',
        function($rootScope, $scope, $sce, $state, PropertyService) {
            $scope.property = PropertyService.get({ safename: $state.params.pid }, function(data) {
                $rootScope.title = data.name;
                $rootScope.subtitle = data.description;
                $scope.trustedHtml = $sce.trustAsHtml(data.body);
            });
            $scope.media = PropertyService.media({ safename: $state.params.pid });
        }])

    .controller('ContactController', ['$rootScope', '$scope',
        function($rootScope, $scope) {
            $rootScope.title = 'Contact';
            $rootScope.subtitle = null;
        }])

    .controller('AboutController', ['$rootScope', '$scope',
        function($rootScope, $scope) {
            $rootScope.title = 'About';
            $rootScope.subtitle = null;
        }])