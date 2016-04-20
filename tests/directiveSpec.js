describe('Modules::Speaker::Directive', function () {
    var $window, element, $scope, directiveScope, expectedVolume;

    beforeEach(inject(function ($compile, $rootScope) {
        expectedVolume = 0.5;
        $scope = $rootScope;

        element = $compile('<speaker></speaker>')($scope);

    }));

    describe('rendering', function () {
        it('loading', function () {
            $scope.$digest();

            directiveScope = element.isolateScope();

            var $element = $(element[0]);
            expect($element.find('.speakerDirective__svg').length).toEqual(1);
            expect($element.find('.speakerDirective__sliderVolume').length).toEqual(1);
            expect($element.find('.speakerDirective__sliderVolume__bar').length).toEqual(1);
        });
    });

    describe('toggleSpeaker', function () {
        it('toggleSpeaker once', function(){
            $scope.$digest();
            directiveScope = element.isolateScope();
            expectedVolume = 0.1;
            directiveScope.toggleSpeaker();
            expect(directiveScope.isSpeakerOff).toEqual(true);
        });

        it('toggleSpeaker twice', function(){
            $scope.$digest();
            directiveScope = element.isolateScope();
            expectedVolume = 0.1;
            directiveScope.toggleSpeaker();
            directiveScope.toggleSpeaker();
            expect(directiveScope.isSpeakerOff).toEqual(false);
        });
    });

    describe('startDrag', function () {
        it('move volume bar to 100%', function(){
            var $event = {
                offsetX: 100,
                pageX: 100,
                preventDefault: function () {}
            };

            $scope.$digest();
            directiveScope = element.isolateScope();
            element.find('.speakerDirective__sliderVolume').css('width', '100px');

            expectedVolume = 1;
            directiveScope.startDrag($event);
        });

        it('move volume bar to 75%', function(){
            var $event = {
                offsetX: 75,
                pageX: 75,
                preventDefault: function () {}
            };

            $scope.$digest();
            directiveScope = element.isolateScope();
            element.find('.speakerDirective__sliderVolume').css('width', '100px');

            expectedVolume = 0.75;
            directiveScope.startDrag($event);
        });
    });
});
