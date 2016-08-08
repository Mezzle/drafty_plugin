var drafty = angular.module("drafty", ['ngAnimate'])
    .config([
        '$compileProvider', function ($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        }
    ]);

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
        switch(character.toLowerCase())
        {
            case 'cho':
            case 'gall':
                return '/images/heroes/chogall.jpg';
                break;
            case 'butcher':
                return '/images/heroes/the-butcher.jpg';
            break;
            case 'li li':
                return '/images/heroes/lili.jpg';
            default:
                var imageName = character.replace('.', '').replace(' ', '-').replace('\'', '');
                return '/images/heroes/' + imageName + '.jpg';
        }
    };

    $interval($scope.load, 5000);
});
