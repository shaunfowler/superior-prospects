angular.module('app')
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

            // Reload all media after any uploads
            $scope.uploader.onCompleteAll = function() {
                $scope.media = PropertyService.media({ _id: $state.params.pid });
                $scope.$apply();
            };

            // Check if file type is an image format
            $scope.isPhotoType = function(extension) {
                var extensions = ['png', 'jpg', 'jpeg', 'gif', 'img'];
                return extensions.indexOf(extension) > -1;
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
                    $scope.location = LocationService.get({ _id: property.locationRefId });
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
                    MediaService.delete({ _id: id });
                    _.remove($scope.media, function(m) {
                        return m._id == id;
                    });
                }
            }
        }]);