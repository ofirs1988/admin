(function () {
    'use strict';
    app.factory('campaignService', campaignService);
    campaignService.$inject = ['httpService'];
    function campaignService(httpService) {
        var service = {};
        service.createCampaign = createCampaign;
        service.setCampaign = setCampaign;
        service.getCampaign = getCampaign;
        return service;

        function createCampaign(campaign) {
            return httpService.httpPost('createCampaign',campaign).then(function (response) {
                return response;
            })
        }

        function setCampaign() {

        }

        function getCampaign() {

        }


    }
})();