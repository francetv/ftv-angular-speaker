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

angular.module('ftv.components.speaker', ['ftv.components.speaker.templates'])
    .directive('ftvSpeaker', ['$rootScope', '$document', function ($rootScope, $document) {
        return {
            restrict: 'E',
            scope: {
            },
            templateUrl: '/speaker/index.html',
            link: function ($scope, element) {
                $scope.currentVolume = 0.2; //value from 0 to 1, step by decimal

                function getVolumeBarElement() {
                    return element.find('.speakerDirective__sliderVolume__bar');
                }

                function getVolumeWidth() {
                    return element.find('.speakerDirective__sliderVolume').width();
                }

                function getVolumeRatioForOffsetX(offsetX) {
                    return offsetX / getVolumeWidth() * 100;
                }

                function setVolumeBarByRatio(ratio) {
                    getVolumeBarElement().css('width', ratio + '%');

                    $rootScope.$emit('ftv-speaker-set-volume', ratio);
                }

                /**
                 * Mute/unmute
                 */
                $scope.toggleSpeaker = function () {
                    $scope.isSpeakerOff = !$scope.isSpeakerOff;

                    $rootScope.$emit('ftv-speaker-toggle', $scope.isSpeakerOff);

                    if ($scope.isSpeakerOff) {
                        setVolumeBarByRatio(0);

                        return;
                    }

                    setVolumeBarByRatio($scope.currentVolume * 100);
                };

                function moveVolumeBar($event) {
                    var ratio = getVolumeRatioForOffsetX($event.offsetX);
                    if ($scope.isSpeakerOff) {
                        $scope.toggleSpeaker();
                    }

                    $scope.currentVolume = ratio/100;
                    setVolumeBarByRatio(ratio);
                }

                /**
                 * Handle drag and drop volume bar
                 */
                function setVolumeRatioForEvent(event) {
                    var $volumeBar = element.find('.speakerDirective__sliderVolume');
                    var refXLeft = $volumeBar.offset() ? $volumeBar.offset().left : 0;
                    var volumeBarWidth = $volumeBar.width();

                    var xPos = event.pageX;
                    if (!xPos) {
                        xPos = event.originalEvent.touches[0].pageX;
                    }

                    var offsetX = xPos - refXLeft;
                    if (offsetX < 0) {
                        offsetX = 0;
                    }
                    if (offsetX > volumeBarWidth) {
                        offsetX = volumeBarWidth;
                    }

                    if (offsetX > volumeBarWidth-2) {
                        getVolumeBarElement().css('border-radius', "5px");
                    } else {
                        getVolumeBarElement().css('border-radius', "5px 0 0 5px");
                    }

                    moveVolumeBar({offsetX:offsetX});
                }

                $scope.startDrag = function ($event) {
                    $event.preventDefault();
                    dragging($event);
                    $document.on('mousemove', dragging);
                    $document.on('mouseup', stopDrag);
                    $rootScope.$emit('ftv-speaker-dragging-start');
                };

                function dragging($event) {
                    setVolumeRatioForEvent($event);
                }

                function stopDrag() {
                    $document.off('mousemove', dragging);
                    $document.off('mouseup', stopDrag);

                    $rootScope.$emit('ftv-speaker-dragging-stop');
                }
            }
        };
    }]);

angular.module("ftv.components.speaker.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/speaker/index.html","<div class=\"speakerDirective\"><div ng-include=\"\'/speaker/speaker.svg.html\'\" ng-click=\"toggleSpeaker()\" class=\"speakerDirective__svg\" ng-class=\"{\'speakerDirective__svg--off\': isSpeakerOff}\"></div><div class=\"speakerDirective__sliderVolume\" ng-mousedown=\"startDrag($event)\"><div class=\"speakerDirective__sliderVolume__bar\"></div></div></div>");
$templateCache.put("/speaker/speaker.svg.html","<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" preserveAspectRatio=\"xMidYMid\" width=\"21\" height=\"18\" viewBox=\"0 0 21 18\"><path class=\"speaker\" d=\"M18.120,16.163\n    C8.219,17.406 7.889,17.134 7.461,16.775\n    C7.461,16.775 3.731,13.676 3.731,13.676\n    C3.731,13.676 1.244,13.676 1.244,13.676\n    C0.560,13.676 0.000,13.116 0.000,12.432\n    C0.000,12.432 0.000,4.971 0.000,4.971\n    C0.000,4.287 0.560,3.728 1.244,3.728\n    C1.244,3.728 3.731,3.728 3.731,3.728\n    C3.731,3.728 7.461,0.629 7.461,0.629\n    C7.888,0.270 8.219,-0.002 8.705,-0.002\n    C9.462,-0.002 9.948,0.609 9.948,1.241\n    C9.948,1.241 9.948,16.163 9.948,16.163\n    C9.948,16.794 9.462,17.406 8.705,17.406 Z\"/><g><path class=\"wave\" d=\"\n        M18.120,16.163\n        C17.599,17.264 17.108,17.406 16.671,17.406\n        C15.932,17.406 15.427,16.785 15.427,16.163\n        C15.427,15.123 17.409,13.345 17.409,8.702\n        C17.409,4.058 15.427,2.281 15.427,1.241\n        C15.427,0.619 15.932,-0.002 16.671,-0.002\n        C17.108,-0.002 17.601,0.140 18.122,1.241\n        C18.691,2.446 19.896,4.874 19.896,8.702\n        C19.896,12.529 18.691,14.958 18.120,16.163 ZM12.435,14.919 Z\"/><path class=\"wave\" d=\"\n        M18.120,16.163\n        C11.658,14.919 11.191,14.268 11.191,13.676\n        C11.191,12.792 12.435,11.947 12.435,8.702\n        C12.435,5.457 11.191,4.612 11.191,3.728\n        C11.191,3.135 11.658,2.485 12.435,2.485\n        C13.066,2.485 13.445,2.824 13.853,3.728\n        C14.617,5.420 14.922,7.041 14.922,8.702\n        C14.922,10.363 14.617,11.984 13.853,13.676\n        C13.445,14.579 13.066,14.919 12.435,14.919 ZM8.705,17.406 Z\"/></g><g><path class=\"cross\" d=\"M20.293,3.199 C20.293,3.199 21.707,4.613 21.707,4.613 C21.707,4.613 12.707,13.613 12.707,13.613 C12.707,13.613 11.293,12.199 11.293,12.199 C11.293,12.199 20.293,3.199 20.293,3.199 \"/><path class=\"cross\" d=\"M11.293,4.613 C11.293,4.613 12.707,3.199 12.707,3.199 C12.707,3.199 21.707,12.199 21.707,12.199 C21.707,12.199 20.293,13.613 20.293,13.613 C20.293,13.613 11.293,4.613 11.293,4.613 \"/></g></svg>");}]);