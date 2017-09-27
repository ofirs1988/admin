(function () {
    'use strict';
    app.factory('adminService', adminService);
    adminService.$inject = ['$http','httpService'];
    function adminService($http,httpService) {
        var service = {};
        service.getAdmin = getAdminData;
        return service;


        function getAdminData() {
            var admin = localStorage.getItem('dXNlcg==');
            var company = localStorage.getItem('Y29tcGFueQ==');

            return [JSON.parse(admin),JSON.parse(company)];
        }

        function setCompany() {

        }

        function getCompany() {

        }

    }
})();