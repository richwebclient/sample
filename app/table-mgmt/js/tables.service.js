angular.module('table-mgmt')
    .factory('tables', function () {
        return {
            getTableDetails: function (tableId) {
                return {
                    id: tableId,
                    location: 'przy oknie'
                };
            },
            getTables: function () {
                return [
                    {
                        id: 1
                    },
                    {
                        id: 2
                    },
                    {
                        id: 3
                    }
                ];
            }
        }
    });