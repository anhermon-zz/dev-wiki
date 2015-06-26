(function(angular) {
    'use strict';
    angular.module('angCore')
    .directive('angAnimate', angAnimate);
    ///////////////////
    function angAnimate($timeout) {
        var NG_HIDE_CLASS = 'ng-hide';
        return {
            restrict:      'A',
            link: function(scope, elem, attr) {
                var animate = scope.$eval(attr.angAnimate);
                if (!animate) {return;}
                if (!!animate.enter) {
                    console.log('animating enter');
                    scope.$watch(isShown, function () {
                        temporaryClass(animate.enter);
                    });
                }
                if (!!animate.leave) {
                    console.log('animating leave');
                    scope.$watch(isHidden, function () {
                        temporaryClass(animate.leave);
                    });
                }
                ////////////
                function temporaryClass(className) {
                    elem.addClass(className);
                    $timeout(function() {
                        elem.removeClass(className);
                    }, 5000);
                }
                function isHidden(newVal, old) {
                    var changed = newVal !== old;
                    return changed && elem.css('display') === 'none';
                }
                function isShown(newVal, old) {
                    return !isHidden();
                }
            }
        };
    }
})(angular);
