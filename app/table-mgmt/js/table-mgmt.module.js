angular.module('table-mgmt', ['ngRoute']).config(function ($routeProvider) {
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
            table: function ($route, tables) {
                return tables.getTableDetails($route.current.params.tableId);
            }
        }
    }).otherwise({
        redirectTo: '/tables'
    })
});
