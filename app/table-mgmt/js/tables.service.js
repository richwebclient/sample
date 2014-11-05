angular.module('table-mgmt')
    .factory('tables', function ($http) {
        return {
            getTables: function () {
                return $http.get('/services/table').then(function (response) {
                    return response.data;
                });
            }
        }
    })
    .factory('Table', function ($resource) {
        return $resource('/services/table/:id', {id: '@id'})
    });