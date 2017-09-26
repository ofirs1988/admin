(function () {
    'use strict';
    app.factory('companyService', companyService);
    companyService.$inject = ['$http','envService'];
    function companyService($http,envService) {
        var data = [];
        const BaseServerUrl = envService.read('apiUrl');

        var service = {};

        service.createCompany = createCompany;
        service.setCompany = setCompany;
        service.getCompany = getCompany;
        return service;


        function createCompany() {

        }

        function setCompany() {

        }

        function getCompany() {

        }

    }
})();