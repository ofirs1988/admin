app.controller('mainController', ['$scope','adminService', function ($scope,adminService) {
    console.log('main Controller');
    var adminObject = adminService.getAdmin()
    console.log(adminObject);
}]);