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