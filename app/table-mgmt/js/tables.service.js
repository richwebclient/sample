angular.module('table-mgmt')
    .factory('tables', function ($http) {
        return {
            getTables: function () {
                return $http.get('/services/rest/tablemanagement/table').then(function (response) {
                    return response.data;
                });
            }
        }
    })
    .factory('Table', function ($resource) {
        return $resource('/services/rest/tablemanagement/table/:id', {id: '@id'})
    });