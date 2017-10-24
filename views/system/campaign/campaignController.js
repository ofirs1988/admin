app.controller('adminCampaignController', ['$scope','httpService', function ($scope,httpService) {
    var vm = this;

    vm.createCampaign = createCampaign;
    function createCampaign() {
        const company = localStorage.getItem('Y29tcGFueQ==');
        vm.campaign.cid = JSON.parse(company).id;
        httpService.httpPost('createCampaign',vm.campaign).then(function (res) {
            console.log(res);
        })
    }

}]);