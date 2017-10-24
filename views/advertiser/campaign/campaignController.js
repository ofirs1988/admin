app.controller('campaignController', ['$scope','campaignService','$state','UploadService','Upload', function ($scope,campaignService,$state,UploadService,Upload) {
    var vm = this;
    vm.createCampaign = createCampaign;

    function createCampaign() {
        const company = localStorage.getItem('Y29tcGFueQ==');
        vm.campaign.cid = JSON.parse(company).id;
        campaignService.createCampaign(vm.campaign).then(function (response) {
            console.log(response);
            if(response[0].data.success){
                $state.go('app.advertiser.campaign',{});
            }
        })
    }


    // httpService.httpPost('getCampaign',[]).then(function (res) {
    //     console.log(res);
    // });


    $scope.submit = function() {
        if ($scope.form.file.$valid && $scope.obj.video) {
            $scope.obj.video.CurrentName = $scope.obj.name;
            $scope.obj.video.poster = $scope.obj.poster;
            $scope.obj.video.clicks = $scope.obj.clicks;
            console.log($scope.obj.video);

            UploadService.uploadFiles($scope.obj).then(function (response){
                console.log(response);
            });
        }
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: $rootScope.apiUrl + 'upload/uploadVideo',
            data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

}]);