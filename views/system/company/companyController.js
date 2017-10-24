app.controller('adminCompanyController', ['$scope','companyService', function ($scope,companyService) {
    console.log('company Controller');
    var vm = this;
    vm.createCompany = createCompany;

    function createCompany() {
        companyService.createCompany(vm.user,vm.company).then(function (response) {
            console.log(response);
        })
    }

}]);