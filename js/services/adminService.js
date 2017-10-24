(function () {
    'use strict';
    app.factory('adminService', adminService);
    adminService.$inject = ['$http','httpService','$rootScope'];
    function adminService($http,httpService,$rootScope) {
        var service = {};
        service.getAdmin = getAdminData;
        return service;

        function getAdminData() {
            var company = {};
            var admin = localStorage.getItem('dXNlcg==');
            var data = localStorage.getItem('ZGF0YQ==');

            data = JSON.parse(data);
            console.log(data);

            $rootScope.isCompany = data.company;
            $rootScope.isCampaign = data.campaign;
            return [JSON.parse(admin)];
        }

        function setCompany() {

        }

        function getCompany() {

        }

    }
})();