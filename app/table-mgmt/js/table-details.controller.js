angular.module('table-mgmt').controller('TableDetailsCntl', function ($scope, $routeParams, table, $location) {
    $scope.$routeParams = $routeParams;
    $scope.table = table;
    $scope.occupy = function () {
        $scope.table.state = 'Occupied';
        $scope.table.$save().then(function () {
            $location.path('/tables');
        })
    }
});