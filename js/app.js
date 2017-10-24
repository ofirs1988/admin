// Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';

var app = angular
.module('app', ['ui.router',
  'ngSanitize',
  'permission',
  'permission.ui',
  'satellizer',
  'angular-jwt',
  'environment',
  'oc.lazyLoad',
  'ncy-angular-breadcrumb',
  'angular-loading-bar',
  'ngFileUpload'
]);

app.config(['cfpLoadingBarProvider','envServiceProvider','$authProvider','$permissionProvider',
    function(cfpLoadingBarProvider,envServiceProvider,$authProvider,$permissionProvider) {
  cfpLoadingBarProvider.includeSpinner = true;
  cfpLoadingBarProvider.latencyThreshold = 1;
    envServiceProvider.config({
        domains: {
            development: ['localhost', 'http://localhost:8000'],
            production: ['46.101.194.126', 'http://46.101.194.126', 'http://46.101.194.126/public/api'],
            test: ['test.acme.com', 'acme.dev.test', 'acme.*.com'],
        },
        vars: {
            development: {
                apiUrl: 'http://localhost:8000/api/admin/',
                staticUrl: 'http://localhost:8000/api/admin/',
            },
            test: {
                apiUrl: 'http://127.0.0.1:8000/test/admin/',
                staticUrl: 'http://127.0.0.1:8000/test/admin/',
            },
            production: {
                apiUrl: 'http://46.101.194.126/laravel/public/api/admin/',
                staticUrl: 'http://46.101.194.126/laravel/public/api/admin/',
            },
            defaults: {
                apiUrl: '//api.default.com/v1',
                staticUrl: '//static.default.com'
            }
        }
    });
    $permissionProvider.suppressUndefinedPermissionWarning(true);
    envServiceProvider.check();
    $authProvider.loginUrl = envServiceProvider.read('apiUrl') + 'user/adminLogin';

}])



.run(['$rootScope','$state','$stateParams','$http','envService','$transitions','PermPermissionStore','$timeout','$q','AuthenticationService','$urlRouter','permissionsService',
    function($rootScope, $state, $stateParams,$http,envService,$transitions,PermPermissionStore,$timeout,$q,AuthenticationService,$urlRouter,permissionsService) {
        /* Before load app */
            var deferred = $q.defer();
            $timeout(function() {
                AuthenticationService.isAuthorized().then(function (response){
                    //$rootScope.userLogin = response.success;
                    if(!response.success){
                        $state.go('appSimple.login',{}, {reload: true});
                        deferred.reject();
                    }else {
                        if (0 < response.permissionList.length) {
                            var permissions = PermPermissionStore.getStore();
                            $urlRouter.sync();
                            // Also enable router to listen to url changes
                            $urlRouter.listen();
                        }
                        deferred.resolve();
                    }
                });
            });

    $transitions.onSuccess({}, function() {
       //event.preventDefault();
       document.body.scrollTop = document.documentElement.scrollTop = 0;
     });

   $rootScope.$state = $state;
   return $rootScope.$stateParams = $stateParams;
}]);



