/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 France Télévisions
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

angular.module('demoApp', ['ftv.components.speaker']);
angular.module('demoApp').controller('DemoController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.volume = 20;
    $scope.isMuted = false;
    $scope.dragging = "stop";

    $rootScope.$on('ftv-speaker-toggle', function($event, isMuted) {
        console.log("Speaker is " + (isMuted === true ? "muted" : "unmuted"));
        $scope.isMuted = isMuted;
    });

    $rootScope.$on('ftv-speaker-set-volume', function($event, ratio) {
        console.log("Volume is set to " + ratio + "%");
        $scope.volume = ratio;
    });

    $rootScope.$on('ftv-speaker-dragging-start', function($event) {
        console.log("Start dragging volume bar");
        $scope.dragging = "start";
    });

    $rootScope.$on('ftv-speaker-dragging-stop', function($event) {
        console.log("Stop dragging volume bar");
        $scope.dragging = "stop";
        $scope.$apply();
    });
}]);
