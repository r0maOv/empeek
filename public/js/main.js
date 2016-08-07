var app = angular.module('empeek', []);

app.controller('MainCtrl', ['$scope', function ($scope) {

    $scope.add = function () {
        localStorage.setItem('foo', 'bar');
    };

    $scope.delete = function () {
        console.log(Object.keys(localStorage));
    }


}]);