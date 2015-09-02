'use strict';

/* Directives */

angular.module('myApp.directives', [])

    .directive('ng-input', function () {
        scope.$on('ngGridEventStartCellEdit', function() {
            elm.focus();
        });

        angular.element( elm ).bind( 'blur', function () {
            scope.$emit( 'ngGridEventEndCellEdit' );
        });
    });
