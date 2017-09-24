(function () {
    'use strict';
    angular
        .module('app').factory('UploadService', UploadService);
    UploadService.$inject = ['Upload','$rootScope'];
    function UploadService(Upload,$rootScope) {
        var service = {};

        service.uploadFiles = uploadFiles;
        return service;

        function uploadFiles(obj) {
            var $url = $rootScope.apiUrl + 'upload/uploadVideo';
            return Upload.upload({
                url: $url,
                data: {file: obj}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ');

            });
         }
    }

})();