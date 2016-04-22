angular.module('ftv.component.speaker', ['ftv.components.speaker.templates'])
    .directive('speaker', ['$rootScope', '$document', function ($rootScope, $document) {
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
