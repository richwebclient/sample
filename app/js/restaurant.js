/* 
 * global:angular
 */
var restaurant = angular.module("restaurant", []);
restaurant.factory('tableService', ['$http', function ($http) {
        var tablesData = {tables: [], offer: [], orders: []}
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
            putOrder : function(id) {
                $http.post('services/rest/salesmanagement/order',this.getOrder(id));
            },
            getOrder: function (id) {
                if (!tablesData.orders[id]) {
                    tablesData.orders[id] = {
                        order: {
                            tableId: id,
                            state: "OPEN"
                        },
                        positions: [
                        ]

                    };
                }
                return tablesData.orders[id];
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
                if (tablesData.tables.length <= 0) {
                    $http.get('/services/rest/tablemanagement/table/')
                            .success(function (data) {
                                tablesData.tables = data;
                            });
                    $http.get('/services/rest/offermanagement/offer')
                            .success(function (data) {
                                tablesData.offer = data;
                            });
                    $http.get('/services/rest/salesmanagement/order')
                            .success(function (data) {
                                for (index in data) {
                                    var ord = data[index];
                                    tablesData.orders[ord.order.tableId] = ord;
                                }
                                
                            });
                }

            },
            markTable: function (table) {
                $http.post('/services/rest/tablemanagement/table/' + table.id + '/markTableAs' + table.state);
            },
            addPosition: function (position, id) {
                var order = this.getOrder(id);
                order.positions.push({
                                comment: "",
                                offerId: null,
                                offerName: position.description,
                                price: position.currentPrice,
                                revision: null,
                                state: "ORDERED"
                            });
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
        $scope.isOccupied = function (table) {
            return table.state === "OCCUPIED";
        };
        $scope.close = function (table) {
            $scope.selected = null;
            return false;
        };
        $scope.getOrder = function (table) {
            return tableService.getOrder(table.id);
        };
        $scope.submit = function (table) {
            return tableService.putOrder(table.id);
        };
        
        $scope.addPosition = function(pos,table) {
            tableService.addPosition(pos,table.id);
        };
    }]);
;