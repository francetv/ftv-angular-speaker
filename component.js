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
