(function () {
    'use strict';
    app.factory('companyService', companyService);
    companyService.$inject = ['$http','httpService'];
    function companyService($http,httpService) {
        var service = {};
        service.createCompany = createCompany;
        service.setCompany = setCompany;
        service.getCompany = getCompany;
        return service;


        function createCompany(user,company) {
            var array = [];
            array.push(user,company);
            return httpService.httpPost('createCompanyByAdmin',array).then(function (response) {
                return response;
            })
        }

        function setCompany() {

        }

        function getCompany() {

        }

    }
})();