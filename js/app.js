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
  'satellizer',
  'mm.acl',
  'angular-jwt',
  'environment',
  'oc.lazyLoad',
  'ncy-angular-breadcrumb',
  'angular-loading-bar',
  'ngFileUpload'
])
.config(['cfpLoadingBarProvider','envServiceProvider','$authProvider','AclServiceProvider', function(cfpLoadingBarProvider,envServiceProvider,$authProvider,AclServiceProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
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
                apiUrl: 'http://46.101.194.126/public/api/admin/',
                staticUrl: 'http://46.101.194.126/public/api/admin/',
            },
            defaults: {
                apiUrl: '//api.default.com/v1',
                staticUrl: '//static.default.com'
            }
        }
    });
    envServiceProvider.check();
    $authProvider.loginUrl = envServiceProvider.read('apiUrl') + 'user/adminLogin';

    var myConfig = {
        storage: 'localStorage',
        storageKey: 'AppAcl'
    };
    AclServiceProvider.config(myConfig);

}])

.config(['AclServiceProvider', function (AclServiceProvider) {
    AclServiceProvider.resume();
}])


.run(['$rootScope', '$state', '$stateParams','$http','envService','AclService',
    function($rootScope, $state, $stateParams,$http,envService,AclService) {


        console.log(AclService.resume());
        if (!AclService.resume()) {
            // Web storage record did not exist, we'll have to build it from scratch

            // Get the user role, and add it to AclService
            //var userRole = fetchUserRoleFromSomewhere();
            //AclService.addRole(userRole);

            // Get ACL data, and add it to AclService
            //var aclData = fetchAclFromSomewhere();
            //AclService.setAbilities(aclData);
        }

  console.log(envService.get());
  $rootScope.$on('$stateChangeSuccess',function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
  $rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;
}]);



