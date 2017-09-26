app.controller('companyController', ['$scope','httpService', function ($scope,httpService) {
    console.log('company Controller');
    var vm = this;
    vm.createCompany = createCompany;

    function createCompany() {
        console.log(vm);
    }

}]);