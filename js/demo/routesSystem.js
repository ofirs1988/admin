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
        templateUrl: 'views/system/company/createCompany.html',
        controller: 'adminCompanyController',
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
        templateUrl: 'views/system/campaign/createCampaign.html',
        controller: 'adminCampaignController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
            label: 'Campaign'
        },
    })


    .state('app.system.videos', {
        url: '/videos',
        templateUrl: 'views/system/videos/videos.html',
        ncyBreadcrumb: {
            label: 'videos'
        },
    })


            .state('app.advertiser', {
                url: "/advertiser",
                abstract: true,
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    label: 'Advertiser'
                },
                data: {
                    permissions: {
                        only: ['advertiser'],
                        //redirectTo: 'appSimple.login'
                    }
                },
            })

            .state('app.advertiser.createCompany', {
                url: '/createCompany',
                templateUrl: 'views/advertiser/company/createCompany.html',
                ncyBreadcrumb: {
                    label: 'Company'
                },
                controller:'companyController',
                controllerAs: 'vm',
                data: {
                    permissions: {
                        only: ['ADMIN','Administrator','advertiser'],
                        //redirectTo: 'appSimple.login'
                    }
                },

            })

            .state('app.advertiser.company', {
                url: '/company',
                templateUrl: 'views/advertiser/company/company.html',
                ncyBreadcrumb: {
                    label: 'Company'
                },
                controller:'companyController',
                controllerAs: 'vm',
                data: {
                    permissions: {
                        only: ['advertiser'],
                        //redirectTo: 'appSimple.login'
                    }
                },
            })

            .state('app.advertiser.createCampaign', {
                url: '/createCampaign',
                templateUrl: 'views/advertiser/campaign/createCampaign.html',
                controller: 'campaignController',
                controllerAs: 'vm',
                ncyBreadcrumb: {
                    label: 'Create campaign'
                },
                data: {
                    permissions: {
                        only: ['ADMIN','Administrator','advertiser'],
                        //redirectTo: 'appSimple.login'
                    }
                },
            })

            .state('app.advertiser.campaign', {
                url: '/campaign',
                templateUrl: 'views/advertiser/campaign/campaign.html',
                ncyBreadcrumb: {
                    label: 'Campaign'
                },
                controller: 'campaignController',
                controllerAs: 'vm',
                data: {
                    permissions: {
                        only: ['ADMIN','Administrator','advertiser'],
                        //redirectTo: 'appSimple.login'
                    }
                },
            })

    }]);