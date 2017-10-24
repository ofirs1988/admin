app.controller('mainController', ['$scope','adminService', function ($scope,adminService) {
    console.log('main Controller');
    var adminObject = adminService.getAdmin();
    console.log(adminObject);

    $scope.email = adminObject[0].email;
    //$scope.companyName = adminObject[1].name;
    //console.log(adminObject[1].name);

    $scope.avatar = adminObject[0].avatar;




}]);