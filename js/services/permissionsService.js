(function () {
    'use strict';
    app.factory('permissionsService', permissionsService);
    permissionsService.$inject = ['$rootScope','httpService'];
    function permissionsService($rootScope,httpService) {
        var permissionList;
        var data = [];
        var service = {};
        //service.getPermissions = getPermissions;
        service.setPermissions = setPermissions;
        service.hasPermission = hasPermission;

        return service;


        function setPermissions(permissions) {
            permissionList = [];
            angular.forEach(permissions, function (key,value) {
                    permissionList.push(value);
            });
            return permissionList;
        }

        function hasPermission(permissions) {
            permissionList = Object.keys(permissions).map(function(data){
                return [data,permissions[data]];
            });
            return permissionList;

        }
    }
})();