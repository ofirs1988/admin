app.controller('companyController', ['$scope','companyService','adminService', function ($scope,companyService,adminService) {
    var vm = this;
    vm.createCompany = createCompany;
    vm.updateCompany = updateCompany;
    vm.companyData = companyData;

    function createCompany() {
        companyService.createCompany(vm.user,vm.company).then(function (response) {
            console.log(response);
        })
    }
    
    function companyData() {
        var adminObject = adminService.getAdmin();
        $scope.companyName = adminObject[1].name;
        $scope.companyEmail = adminObject[1].email;
        $scope.contact_name = adminObject[1].contact_name;
        $scope.companyPhone = adminObject[1].phone;
        $scope.companyOp = adminObject[1].op;
        $scope.companySite = adminObject[1].site;

    }
    
    function updateCompany() {

    }

}]);