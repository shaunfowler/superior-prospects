angular.module('app')

    .controller('LoginController', ['$rootScope', '$scope', '$state', 'isLoggedIn',
        function($rootScope, $scope, $state, isLoggedIn) {

            $rootScope.title = "Login";
            $rootScope.subtitle = null;

            if (isLoggedIn) {
                $state.go('admin');
            }
        }])

    .controller('AdminController', ['$rootScope', '$scope', '$state', 'isLoggedIn',
        function($rootScope, $scope, $state, isLoggedIn) {

            $rootScope.title = 'Administration';
            $rootScope.subtitle = null;

            if (!isLoggedIn) {
                $state.go('login');
            }

            $scope.logout = function() {
                LoginService.logout();
            }
        }])

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
                    $state.go('admin.properties.edit', { pid: result.id });
                });
            };
        }])

    .controller('AdminPropertyController', ['$rootScope', '$scope', '$state', '$log', 'isLoggedIn', 'PropertyService', 'LocationService', 'MediaService', 'FileUploader',
        function($rootScope, $scope, $state, $log, isLoggedIn, PropertyService, LocationService, MediaService, FileUploader) {

            $rootScope.title = null;
            $rootScope.subtitle = null;

            if (!isLoggedIn) {
                $state.go('login');
            }

            // Editor options
            $scope.tinymceOptions = {
                menubar: false
            }

            // New instance of the file uploader
            $scope.uploader = new FileUploader();

            // Add the auth header
            $scope.uploader.onBeforeUploadItem = function(item) {
                // item.headers.Authorization = 'Bearer ' + LoginService.token();
            };

            // Reload all media after any uploads
            $scope.uploader.onCompleteAll = function() {
                $scope.media = PropertyService.media({ _id: $state.params.pid });
                $scope.$apply();
            };

            // Check if file type is an image format
            $scope.isPhotoType = function(extension) {
                var extensions = ['png', 'jpg', 'jpeg', 'gif', 'img'];
                return (extensions.indexOf(extension) > -1)
                //return extension == 'png' || extension == 'jpg' || extension == 'jpeg'
                //    || extension == 'gif' || extension == 'img';
            }

            // Check if file type is a document format
            $scope.isDocumentType = function(extension) {
                return !$scope.isPhotoType(extension);
            }

            // Load everything
            $scope.locations = LocationService.query();
            $scope.media = PropertyService.media({ _id: $state.params.pid });
            $scope.property = PropertyService.get({ _id: $state.params.pid },
                function(property) {
                    $scope.location = LocationService.get({ lid: property.locationRefId });
                    $scope.uploaderOptions = {
                        url: 'api/media/file/' + property._id
                    }
                });

            // Watch for changes on the location drop down
            $scope.locationSelectOptionChanged = function(locationId) {
                $scope.property.locationRefId = locationId;
            };

            // View a property on the public side
            $scope.viewProperty = function() {
                $state.go('property', { pid: $scope.property._id });
            }

            // Hide a property
            $scope.hideProperty = function() {
                $scope.property.visible = 0;
                $scope.saveProperty();
            }

            // Un-hide a property
            $scope.showProperty = function() {
                $scope.property.visible = 1;
                $scope.saveProperty();
            };

            // Save a property
            $scope.saveProperty = function() {
                PropertyService.update({ _id: $scope.property._id }, $scope.property, function() {
                    $scope.$parent.properties = PropertyService.query();
                });
            };

            // Delete a property
            $scope.deleteProperty = function() {
                if (confirm('Do you really want to delete ' + $scope.property.name + '?')) {
                    PropertyService.delete({ _id: $scope.property._id }, function() {
                        $state.go('admin.properties', {}, { reload: true });
                    });
                }
            };

            // Delete a file
            $scope.deleteFile = function(id) {
                if (confirm('Do you really want to delete ' + id + '?')) {
                    MediaService.delete({ id: id });
                    _.remove($scope.media, function(m) {
                        return m._id == id;
                    });
                }

            }
        }])

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
                    $state.go('admin.locations.edit', { lid: result.id });
                });
            };
        }])

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
            $scope.location = LocationService.get({ lid: $state.params.lid });

            // View a location on the public side
            $scope.viewLocation = function(id) {
                $state.go('location', { lid: id });
            }

            // Save a location
            $scope.saveLocation = function() {
                LocationService.update({ lid: $scope.location.id }, $scope.location);
            };

            // Delete a location
            $scope.deleteLocation = function(id) {
                if (confirm('Do you really want to delete ' + $scope.location.name + '?')) {
                    LocationService.delete({ lid: id }, function() {
                        $state.go('admin.locations', {}, { reload: true });
                    });
                }
            }
        }])

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
            $scope.deleteUpdate = function(id) {
                UpdateService.delete({ uid: id });
                _.remove($scope.updates, function(u) {
                    return u.id == id;
                });
            }
        }]);