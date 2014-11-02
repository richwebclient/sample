/* 
 * global:angular
 */
var restaurant = angular.module("restaurant", []);



restaurant.factory('tableService', ['$http',function ($http) {
        var tablesData = { tables: [], offer: [] } 
        , findTable = function (id) {
            for (var index in tablesData.tables) {
                if (tablesData.tables[index].id === id) {
                    return tablesData.tables[index];
                }
            }
        };


        return {
            getTables: function () {
                this.getFromServer();
                return tablesData;
            },
            occupy: function (id) {
                var table = findTable(id);
                table.state = "OCCUPIED";
                this.markTable(table);
            },
            free: function (id) {
                var table = findTable(id);
                table.state = "FREE";
                this.markTable(table);
            }, findTable: findTable,
            getFromServer: function () {
                if (tablesData.tables.length <= 0)  {
                    $http.get('/services/rest/tablemanagement/table/')
                            .success(function(data) {
                                tablesData.tables = data;
                            });
                    $http.get('/services/rest/offermanagement/offer')
                            .success(function(data) {
                                tablesData.offer = data;
                            });
                }
                
            },
            markTable: function (table) {
                $http.post('/services/rest/tablemanagement/table/' + table.id + '/markTableAs' + table.state);
            }
        };
    }]);

restaurant.controller('tableController', ['$scope', 'tableService', function ($scope, tableService) {
        $scope.selected = null;
        $scope.tablesData = tableService.getTables();
        $scope.isSelected = function (table) {
            return table.id === $scope.selected ? "selected" : "";
        };
        $scope.select = function (table) {
            $scope.selected = table.id;
        };
        $scope.occupy = function (table) {
            tableService.occupy(table.id);
        };
        $scope.free = function (table) {
            tableService.free(table.id);
        };
        $scope.close = function (table) {
            $scope.selected = null;
            return false;
        };
    }]);
;