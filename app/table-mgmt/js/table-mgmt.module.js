angular.module('table-mgmt', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider.when('/tables', {
        templateUrl: '/table-mgmt/html/tables.html',
        controller: 'TablesCntl',
        resolve: {
            tables: function (tables) {
                return tables.getTables();
            }
        }
    }).when('/table-view/:tableId', {
        templateUrl: '/table-mgmt/html/table-view.html',
        controller: 'TableViewCntl',
        resolve: {
            table: function ($route, tables) {
                return tables.getTableDetails($route.current.params.tableId);
            }
        }
    }).otherwise({
        redirectTo: '/tables'
    })
});
