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
