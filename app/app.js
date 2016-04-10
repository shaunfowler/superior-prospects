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
                        // // // $window.ga('send', 'pageview', { page: $location.path() });
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