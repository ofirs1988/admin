(function () {
    'use strict';
    angular.module('app').factory('AuthenticationService', AuthenticationService);
    AuthenticationService.$inject = ['$rootScope','httpService','$q','$http','$auth','permissionsService','PermPermissionStore'];
    function AuthenticationService($rootScope,httpService,$q,$http,$auth,permissionsService,PermPermissionStore){
        var service = {};

        service.isAuthorized = isAuthorized;
        service.AuthUser = AuthUser;
        return service;

        function AuthUser(credentials) {
            var deferred = $q.defer();
            return $auth.login(credentials).then(function(res){
                console.log(res);
                if(res.data.success){
                    var permissionList = permissionsService.setPermissions(res.data.permissionsList);

                    PermPermissionStore.defineManyPermissions(permissionList, function (
                        permissionName, transitionProperties) {
                    });
                    setUserLocalStrorage(res.data);
                    deferred.resolve({success: true , data: res.data});
                }else {
                    deferred.resolve({success: false , error: res.data.massage});
                }
                return deferred.promise;
            });
        }

        function isAuthorized() {
            var deferred = $q.defer();
            var clear = false;
            return httpService.httpPost('user/getUser',[]).then(function (res) {
                if(!res[0].data[0].success || !localStorage.getItem(Base64.encode('user'))){
                    ClearCredentials(function(response) {
                        if(response)
                            clear = true;
                    });
                }else{

                    var permissionList = permissionsService.setPermissions(res[0].data[0].permissions);
                    console.log(permissionList);
                    PermPermissionStore.defineManyPermissions(permissionList, function (
                        permissionName, transitionProperties) {

                    });
                }
                deferred.resolve({success: res[0].data[0].success,clear: clear,permissionList:permissionList});
                return deferred.promise;
            });
        }


        function ClearCredentials(callback) {
            if(localStorage.getItem(Base64.encode('user')))
                localStorage.removeItem(Base64.encode('user'));
            if(localStorage.getItem('satellizer_token'))
                localStorage.removeItem('satellizer_token');

            $http.defaults.headers.common.Authorization = 'NOT Authorization';
            $rootScope.satellizer = {};
            $rootScope.saveUserSuccess = false;
            $rootScope.userLogin = false;
            if(!localStorage.getItem('satellizer_token') && !localStorage.getItem(Base64.encode('user'))){
                callback(true);
            }
        }


        function setUserLocalStrorage(data){
            if(data){
                if(!localStorage.getItem(Base64.decode('user'))){
                    localStorage.setItem(Base64.encode('user'),JSON.stringify(data.user));
                    localStorage.setItem(Base64.encode('data'),JSON.stringify(data.data));
                    return true;
                }
            }
            return false;
        }

    }

    var Base64 = {
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        }
    };

})();