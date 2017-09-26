angular
    .module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
        $stateProvider
.state('app.system', {
    url: "/system",
    abstract: true,
    template: '<ui-view></ui-view>',
    ncyBreadcrumb: {
        label: 'System'
    },
    data: {
        permissions: {
            only: ['ADMIN','Administrator']
            //redirectTo: 'appSimple.login'
        }
    },
})

    .state('app.system.users', {
        url: '/users',
        templateUrl: 'views/system/users/users.html',
        ncyBreadcrumb: {
            label: 'Users'
        },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load({
                    files: ['views/system/users/usersController.js']
                });
            }]
        }
    })

    .state('app.system.company', {
        url: '/company',
        templateUrl: 'views/system/company/company.html',
        controller: 'companyController',
        controllerAs : 'vm',
        ncyBreadcrumb: {
            label: 'Company'
        },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load({
                    files: ['views/system/company/companyController.js']
                });
            }]
        }
    })

    .state('app.system.campaign', {
        url: '/campaign',
        templateUrl: 'views/system/campaign/campaign.html',
        ncyBreadcrumb: {
            label: 'Campaign'
        },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load({
                    files: ['views/system/campaign/campaignController.js']
                });
            }]
        }
    })


    .state('app.system.videos', {
        url: '/videos',
        templateUrl: 'views/system/videos/videos.html',
        ncyBreadcrumb: {
            label: 'videos'
        },
        // resolve: {
        //     loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        //         // you can lazy load files for an existing module
        //         return $ocLazyLoad.load({
        //             files: ['views/system/videos/videosController.js']
        //         });
        //     }]
        // }
    })

    }]);