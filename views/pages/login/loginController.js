(function () {
    'use strict';
    app.controller('loginController',loginController);
    loginController.$inject = ['$scope','AuthenticationService','$state'];
    function loginController($scope,AuthenticationService,$state){
        var vm = this;
        vm.login = login;

        function login() {
            AuthenticationService.AuthUser(vm.user).then(function (response) {
                if(!response.success){
                    $scope.$errors = response.error;
                }else {
                    $state.go('app.main');
                }
            })
        }
    }
})();
