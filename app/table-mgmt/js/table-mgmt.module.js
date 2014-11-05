angular.module('table-mgmt', ['ngRoute', 'ngResource']).config(function ($routeProvider) {
    $routeProvider.when('/tables', {
        templateUrl: '/table-mgmt/html/tables.html',
        controller: 'TablesCntl',
        resolve: {
            tables: function (tables) {
                return tables.getTables();
            }
        }
    }).when('/table-details/:tableId', {
        templateUrl: '/table-mgmt/html/table-details.html',
        controller: 'TableDetailsCntl',
        resolve: {
            table: function ($route, Table) {
                return Table.get({id: $route.current.params.tableId}).$promise;
            }
        }
    }).otherwise({
        redirectTo: '/tables'
    })
});
