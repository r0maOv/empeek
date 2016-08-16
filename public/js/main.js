var app = angular.module('empeek', []);

app.controller('MainCtrl', ['$scope', 'EmpeekStorage', function ($scope, EmpeekStorage) {

    $scope.item = {
        title: '',
        comments: []
    };

    var refreshItem = function () {
        return $scope.item.title = ''
    };

    var refreshComment = function () {
        return $scope.comment = '';
    };

    $scope.items = EmpeekStorage.getData();

    $scope.idSelectedRow = null;

    $scope.setSelected = function (idSelectedRow) {
        console.log(idSelectedRow);
        $scope.idSelectedRow = idSelectedRow;
        getComments(idSelectedRow);
    };

    $scope.addItem = function () {
        var cache = EmpeekStorage.getData() || [];

        cache.push($scope.item);

        try {
            EmpeekStorage.setData(cache);
            $scope.items = EmpeekStorage.getData();
            refreshItem();
        } catch (e) {
            console.log(e.name, e.message);
        }
    };
    
    $scope.comment = '';
    
    $scope.addComment = function (e) {

        if ($scope.idSelectedRow < 0) return;
        if ((e.keyCode === 13 && e.ctrlKey) || (e.keyCode === 13 && e.metaKey)) {
            var cache = EmpeekStorage.getData();
            cache[$scope.idSelectedRow].comments.push($scope.comment);
            try {
                if (EmpeekStorage.setData(cache)) {
                    $scope.items = EmpeekStorage.getData();
                    $scope.comments = $scope.items[$scope.idSelectedRow].comments;
                    refreshComment();
                }
            } catch (e) {
                console.log(e.name, e.message);
            }
        }
    };

    $scope.deleteItem = function (i) {
        var data = EmpeekStorage.getData();
        EmpeekStorage.removeData();
        $scope.items.splice(i, 1);
        data.splice(i, 1);

        try {
            EmpeekStorage.setData(data);
        } catch (e) {
            console.log(e.name, e.message);
        }
    };

    var getComments = function (i) {
        var data = EmpeekStorage.getData();
        $scope.comments = data[i].comments;
    };

}]);

app.factory('EmpeekStorage', ['$window', function ($window) {
    return {
        setData: function (val) {
            $window.localStorage && $window.localStorage.setItem('items', JSON.stringify(val));
            return this;
        },
        getData: function () {
            return $window.localStorage && JSON.parse($window.localStorage.getItem('items'));
        },
        removeData: function () {
            $window.localStorage && $window.localStorage.removeItem('items');
        }
    }
}]);