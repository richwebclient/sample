angular.module('table-mgmt').controller('TableDetailsCntl', function ($scope, $routeParams, table) {
    $scope.$routeParams = $routeParams;
    $scope.table = table;
});