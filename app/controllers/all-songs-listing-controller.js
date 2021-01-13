(function () {
    "use strict";
    musicApp.controller("allSongsListingController", ['$scope', 'playListService', '$mdToast', function ($scope, playListService, $mdToast,) {
        function getAllSongs() {
            playListService.getSongsList().then(function (response) {
                if (checkValid(response)) {
                    $scope.songsList = response.data.splice(0, 100);
                    $scope.isLoading = false;

                }
            }, function errorCall() {
                $scope.isLoading = false;
            });
        }

        function checkValid(data) {
            return Boolean(data !== '' && data !== null && data !== undefined);
        }

        function init() {
            $scope.isLoading = true;
            getAllSongs();
        }

        init();
    }]);
})();