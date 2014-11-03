angular.module('table-mgmt').controller('TableViewCntl', function ($scope, $routeParams, table) {
    $scope.$routeParams = $routeParams;
    $scope.table = table;
});