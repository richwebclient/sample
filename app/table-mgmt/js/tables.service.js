angular.module('table-mgmt')
    .factory('tables', function ($http) {
        return {
            getTableDetails: function (tableId) {
                return {
                    id: tableId,
                    location: 'przy oknie'
                };
            },
            getTables: function () {
                return $http.get('http://demo2026062.mockable.io/tables').then(function (response) {
                    return response.data;
                });
            }
        }
    });