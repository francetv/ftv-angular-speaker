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

describe('FTV::Speaker::Component', function () {
    var $window, element, $scope, directiveScope, expectedVolume;

    beforeEach(module('ftv.components.speaker'));

    beforeEach(inject(function ($compile, $rootScope) {
        expectedVolume = 0.5;
        $scope = $rootScope;

        element = $compile('<ftv-speaker></ftv-speaker>')($scope);

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
