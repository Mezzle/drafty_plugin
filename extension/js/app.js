var drafty = angular.module("drafty", ['ngAnimate'])
    .config([
        '$compileProvider', function ($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        }
    ])
    .directive('ngReallyClick', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    var message = attrs.ngReallyMessage;
                    if (message && confirm(message)) {
                        scope.$apply(attrs.ngReallyClick);
                    }
                });
            }
        }
    }]);

drafty.controller('draftCtrl', function ($scope, $http, $interval) {

    $scope.load = function () {
        $http.get('http://bot.do.mez.im:8080/hubot/draft/data')
            .then(function (response) {
                $scope.draft = response.data;
            });
    };

    $scope.load();

    $scope.reset = function () {
        $http.get('http://bot.do.mez.im:8080/hubot/draft/reset')
            .then(function (response) {
                console.log(response.data);
                $scope.load();
            });
    };

    $scope.next = function () {
        $http.get('http://bot.do.mez.im:8080/hubot/draft/next')
            .then(function (response) {
                console.log(response.data);
                $scope.load();
            });
    };

    $scope.streamOverlay = function () {
        chrome.tabs.create({'url': chrome.extension.getURL('stream.html')});
    };

    $scope.getImage = function(character) {

    };

    $scope.getVideo = function(character) {
        switch(character.toLowerCase())
        {
            case 'cho':
            case 'gall':
                return '/videos/chogall.webm';
                break;
            case 'butcher':
                return '/videos/the-butcher.webm';
                break;
            case 'li li':
                return '/videos/lili.webm';
            default:
                var imageName = character.replace(/\./g, '').replace(/ +/g, '-').replace(/\'/, '');
                return '/videos/' + imageName + '.webm';
        }
    };

    $interval($scope.load, 5000);
});
