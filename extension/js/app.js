var drafty = angular.module("drafty", []);

drafty.controller('draftCtrl', function ($scope, $http) {

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
    }
});
