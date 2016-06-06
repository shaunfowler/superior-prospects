'use strict';

angular.module('app', ['ngResource', 'ui.router', 'ui.bootstrap',
    'angularFileUpload', 'ui.tinymce'/*, 'angular-loading-bar'*/])

    .config(['$urlRouterProvider', '$stateProvider', '$httpProvider',
        function($urlRouterProvider, $stateProvider, $httpProvider) {

            $stateProvider
                // Public
                .state('home', {
                    url: '/',
                    templateUrl: 'views/public/home.html',
                    controller: 'HomeController'
                })
                .state('location', {
                    url: '/locations/:lid',
                    templateUrl: 'views/public/location.html',
                    controller: 'LocationController'
                })
                .state('property', {
                    url: '/properties/:pid',
                    templateUrl: 'views/public/property.html',
                    controller: 'PropertyController'
                })
                .state('contact', {
                    url: '/contact',
                    templateUrl: 'views/public/contact.html',
                    controller: 'ContactController'
                })
                .state('about', {
                    url: '/about',
                    templateUrl: 'views/public/about.html',
                    controller: 'AboutController'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/public/login.html',
                    controller: 'LoginController',
                    resolve: {
                        isLoggedIn: ['LoginHelper', function(LoginHelper) { return LoginHelper.ok() }]
                    }
                })

                // Admin
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'views/admin/home.html',
                    controller: 'AdminController',
                    resolve: {
                        isLoggedIn: ['LoginHelper', function(LoginHelper) { return LoginHelper.ok() }]
                    }
                })
                .state('admin.properties', {
                    url: '/properties',
                    templateUrl: 'views/admin/properties.html',
                    controller: 'AdminPropertiesController',
                    resolve: {
                        isLoggedIn: ['LoginHelper', function(LoginHelper) { return LoginHelper.ok() }]
                    }
                })
                .state('admin.properties.edit', {
                    url: '/:pid',
                    templateUrl: 'views/admin/property.html',
                    controller: 'AdminPropertyController',
                    resolve: {
                        isLoggedIn: ['LoginHelper', function(LoginHelper) { return LoginHelper.ok() }]
                    }
                })
                .state('admin.locations', {
                    url: '/locations',
                    templateUrl: 'views/admin/locations.html',
                    controller: 'AdminLocationsController',
                    resolve: {
                        isLoggedIn: ['LoginHelper', function(LoginHelper) { return LoginHelper.ok() }]
                    }
                })
                .state('admin.locations.edit', {
                    url: '/:lid',
                    templateUrl: 'views/admin/location.html',
                    controller: 'AdminLocationController',
                    resolve: {
                        isLoggedIn: ['LoginHelper', function(LoginHelper) { return LoginHelper.ok() }]
                    }
                })
                .state('admin.updates', {
                    url: '/updates',
                    templateUrl: 'views/admin/updates.html',
                    controller: 'AdminUpdatesController',
                    resolve: {
                        isLoggedIn: ['LoginHelper', function(LoginHelper) { return LoginHelper.ok() }]
                    }
                });

            // Default
            $urlRouterProvider.otherwise('/');

            $httpProvider.interceptors.push('InterceptorService');
        }])

    .run(['$rootScope', '$location', '$window',
        function($rootScope, $location, $window) {
            $rootScope.$on('$stateChangeSuccess',
                function(event) {
                    // // // if (!$window.ga) {
                    // // //     return;
                    // // // }
                    var path = $location.path();
                    if (path.indexOf('/api/') == -1 && path.indexOf('/admin') == -1) {
                        console.log('[+] ' + path);
                        $window.ga('send', 'pageview', { page: $location.path() });
                    } else {
                        console.log('[-] ' + path);
                    }
                });
        }]);

if (!String.prototype.endsWith) {
    Object.defineProperty(String.prototype, 'endsWith', {
        value: function(searchString, position) {
            var subjectString = this.toString();
            if (position === undefined || position > subjectString.length) {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        }
    });
}
angular.module('app').factory('InterceptorService', ['$q', '$window', '$location', '$log',
    function($q, $window, $location, $log) {

        var errors = [400, 404, 405, 500, 503];

        var _responseError = function(rejection) {
            if (rejection.status === 401 && rejection.config.url.indexOf('/api') > -1) {
                $log.warn('401 received from API, redirecting to login page', rejection.config.url);
                $location.path('/#/login');
            }
            if (errors.indexOf(rejection.status) > -1) {
                $log.error('HTTP Error:', rejection.status, ' ',
                    rejection.statusText, '[', rejection.config.url, ']');
            }
            return $q.reject(rejection);
        }

        return {
            responseError: _responseError
        };
    }]);
angular.module('app').factory('LocationService', ['$resource',
    function($resource) {
        return $resource('api/locations/:_id', {}, {
            allProperties: {
                url: 'api/locations/:_id/properties',
                method: 'GET',
                isArray: true
            },
            visibleProperties: {
                url: 'api/locations/:_id/properties/visible',
                method: 'GET',
                isArray: true
            },
            update: {
                method: 'PUT'
            }
        });
    }])

angular.module('app').factory('LoginHelper', ['$http',
    function($http) {
        return {
            ok: function() {
                return $http.get('/user').then(function() {
                    return true;
                }, function() {
                    return false;
                })
            }
        }
    }]);

angular.module('app').factory('MediaService', ['$resource',
    function($resource) {
        return $resource('api/media/:_id');
    }]);
angular.module('app').factory('PropertyService', ['$resource',
    function($resource) {
        return $resource('api/properties/:_id', {}, {
            visible: {
                url: 'api/properties/visible',
                method: 'GET',
                isArray: true
            },
            media: {
                url: 'api/properties/:_id/media',
                method: 'GET',
                isArray: true
            },
            update: {
                method: 'PUT'
            }
        });
    }]);
angular.module('app').factory('UpdateService', ['$resource',
    function($resource) {
        return $resource('api/updates/:_id');
    }]);
angular.module('app')

.directive('calendarTile', ['$filter',
    function ($filter) {
        return {
            restrict: 'AE',
            link: function (scope, element, attrs) {
                scope.year = $filter('niceDate')(attrs.date, 'y');
                scope.month = $filter('niceDate')(attrs.date, 'mmm');
                scope.day = $filter('niceDate')(attrs.date, 'd');
            },
            template:
                '<div class="calendar-tile">' +
                    '<div class="clearfix calendar-tile-top">' +
                        '<div class="pull-left month">{{month}}.</div>' +
                        '<div class="pull-right year">\'{{year}}</div>' +
                    '</div>' +
                    '<div class="day">{{day}}</div>' +
                '</div>'
        };
    }])

.directive('contenteditable', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {

            function read() {
                ngModel.$setViewValue(element.html());
            }

            ngModel.$render = function () {
                element.html(ngModel.$viewValue || '');
            };

            element.bind('blur keyup change', function () {
                scope.$apply(read);
            });
        }
    };
})

.directive('fancybox', ['$compile', '$timeout',
    function ($compile, $timeout) {
        return {
            link: function ($scope, element, attrs) {
                element.fancybox({
                    hideOnOverlayClick: false,
                    hideOnContentClick: false,
                    enableEscapeButton: false,
                    showNavArrows: false,
                    onComplete: function () {
                        $timeout(function () {
                            $compile($('#fancybox-content'))($scope);
                            $scope.$apply();
                            $.fancybox.resize();
                        })
                    }
                });
            }
        }
    }]);
angular.module('app')

.filter('niceDate', function () {
    return function (date, type) {
        switch (type) {
            case 'dmy1':
                return moment.utc(date).format('MMMM Do, YYYY');
            case 'd':
                return moment.utc(date).format('D');
            case 'y':
                return moment.utc(date).format('YY');
            case 'mmm':
                return moment.utc(date).format('MMM');
        }
    };
})

.filter('uppercase', function () {
    return function (text) {
        return text.toUpperCase();
    };
})

.filter('images', function () {
    return function (items) {
        if (!items.$resolved) {
            return;
        }
        var filtered = [];
        angular.forEach(items, function (item) {
            if (item.fileName.toLowerCase().endsWith('.png')
                || item.fileName.toLowerCase().toLowerCase().endsWith('.jpg')
                || item.fileName.toLowerCase().endsWith('.jpeg')
                || item.fileName.toLowerCase().endsWith('.gif')) {
                filtered.push(item);
            }
        });
        return filtered;
    };
})

.filter('documents', function () {
    return function (items) {
        if (!items.$resolved) {
            return;
        }
        var filtered = [];
        angular.forEach(items, function (item) {
            if (item.fileName.toLowerCase().endsWith('.pdf')
                || item.fileName.toLowerCase().endsWith('.xls')
                || item.fileName.toLowerCase().endsWith('.xlsx')) {
                filtered.push(item);
            }
        });
        return filtered;
    };
})

.filter('mediaIcon', [function () {
    return function (fileType) {
        switch (fileType) {
            case 'xls':
            case 'xlsx':
                return 'fa-file-excel-o';
            case 'pdf':
                return 'fa-file-pdf-o';
            case 'doc':
                return 'fa-file-word-o';
            default:
                return 'fa-file-text-o';
        }
    };
}]);
angular.module('app')
    .controller('AdminController', ['$rootScope', '$scope', '$state', 'isLoggedIn',
        function($rootScope, $scope, $state, isLoggedIn) {

            $rootScope.title = 'Administration';
            $rootScope.subtitle = null;

            if (!isLoggedIn) {
                $state.go('login');
            }

            $scope.logout = function() {
                // LoginService.logout(); // TODO
            }
        }]);
angular.module('app')
    .controller('AdminLocationController', ['$rootScope', '$scope', '$state', 'isLoggedIn', 'LocationService',
        function ($rootScope, $scope, $state, isLoggedIn, LocationService) {

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
            $scope.viewLocation = function (id) {
                $state.go('location', { lid: id });
            }

            // Save a location
            $scope.saveLocation = function () {
                LocationService.update({ _id: $scope.location._id }, $scope.location, function () {
                    angular.forEach($scope.$parent.locations, function (val, key) {
                        // Update the sidebar on the parent controller
                        if (val._id === $scope.location._id) {
                            $scope.$parent.locations[key].name = $scope.location.name;
                        }
                    });
                });
            };

            // Delete a location
            $scope.deleteLocation = function (id) {
                if (confirm('Do you really want to delete ' + $scope.location.name + '?')) {
                    LocationService.delete({ _id: id }, function () {
                        $state.go('admin.locations', {}, { reload: true });
                    });
                }
            }
        }]);

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
angular.module('app')
    .controller('AboutController', ['$rootScope', '$scope',
        function($rootScope, $scope) {
            $rootScope.title = 'About';
            $rootScope.subtitle = null;
        }]);
angular.module('app')
    .controller('ContactController', ['$rootScope', '$scope',
        function($rootScope, $scope) {
            $rootScope.title = 'Contact';
            $rootScope.subtitle = null;
        }]);
angular.module('app')
    .controller('HeaderController', ['$rootScope', '$scope', '$state', 'LocationService',
        function($rootScope, $scope, $state, LocationService) {
            $scope.locations = LocationService.query();
            $rootScope.$state = $state;
        }]);
angular.module('app')
    .controller('HomeController', ['$rootScope', '$scope', 'UpdateService', 'PropertyService',
        function($rootScope, $scope, UpdateService, PropertyService) {
            $rootScope.title = 'News and updates';
            $rootScope.subtitle = null;
            $rootScope.updates = UpdateService.query();
            $scope.properties = PropertyService.visible();
        }]);
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
angular.module('app')
    .controller('LoginController', ['$rootScope', '$scope', '$state', 'isLoggedIn',
        function($rootScope, $scope, $state, isLoggedIn) {

            $rootScope.title = "Login";
            $rootScope.subtitle = null;

            if (isLoggedIn) {
                $state.go('admin');
            }
        }]);
angular.module('app')
    .controller('PropertyController', ['$rootScope', '$scope', '$sce', '$state', 'PropertyService',
        function ($rootScope, $scope, $sce, $state, PropertyService) {

            $scope.property = PropertyService.get({ _id: $state.params.pid }, function (data) {
                $rootScope.title = data.name;
                $rootScope.subtitle = data.description;
                $scope.trustedHtml = $sce.trustAsHtml(data.body);
            });

            $scope.media = PropertyService.media({ _id: $state.params.pid });

            $scope.track = function (media) {
                console.log(media)
                ga('send', 'pageview', 'uploads/' + media.fileName,
                    {
                        eventLabel: media.fileName,
                        fieldsObject: {
                            fileName: media.fileName,
                            fileType: media.type,
                            propertyRefId: media.propertyRefId
                        }
                    });
            };

        }]);