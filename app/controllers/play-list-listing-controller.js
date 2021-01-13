
(function () {
    "use strict";
    musicApp.controller("playListListingController", ['$scope', 'playListService', '$mdDialog', function ($scope, playListService, $mdDialog) {

        $scope.createPlayList = function (list, action) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                templateUrl: 'app/views/add-songs.html',
                locals: {
                    items: list,
                    action: action
                },
                controller: ['$scope', 'items', '$mdDialog', 'action', function ($scope, items, $mdDialog, action) {
                    $scope.customSongs = items ? items : [];
                    $scope.isEdit = action;
                    $scope.playListName = (items) ? 'PlayList' + items[0].userId : '';
                    function getAllSongsList() {
                        playListService.getSongsList().then(function (response) {
                            if (response) {
                                $scope.songsList = response.data.splice(0, 100);
                                $scope.isLoading = false;
                                $scope.playLists = $scope.customSongs.length > 0 ? $scope.customSongs : $scope.songsList;
                            }
                        }, function errorCall() {
                            $scope.isLoading = false;
                        });
                    }

                    $scope.close = function () {
                        $mdDialog.cancel();
                    }

                    $scope.addPlayList = function () {
                        $scope.songsList.forEach(element => {
                            if (element.selected) {
                                element.userId = $scope.playListName;
                                $scope.customSongs.push(element);
                            }
                        });
                        setLocalStorage('customPlayList', angular.toJson($scope.customSongs));
                        $scope.close();
                    }

                    $scope.shuffleList = function () {
                        for (var i = 0; i < $scope.customSongs.length - 1; i++) {
                            var j = i + Math.floor(Math.random() * ($scope.customSongs.length - i));
                            var temp = $scope.customSongs[j];
                            $scope.customSongs[j] = $scope.customSongs[i];
                            $scope.customSongs[i] = temp;
                        }
                    }

                    $scope.addSongs = function () {
                        $scope.isEdit = false;
                        $scope.playLists = $scope.songsList;
                    }

                    $scope.removeSong = function () {
                        $scope.customSongs.forEach(element => {
                            if (element.selected) {
                                var index = $scope.customSongs.indexOf(element);
                                $scope.customSongs.slice(index, 1);
                            }
                        });
                        setLocalStorage('customPlayList', angular.toJson($scope.customSongs));
                        $scope.close();
                    }

                    function init() {
                        $scope.isLoading = true;
                        getAllSongsList();
                    }

                    init();
                }]
            });
        }

        function getCustomPlayList() {
            playListService.getCustomPlayList().then(function (response) {
                if (response) {
                    $scope.customPlayList = response.data.groupBy('userId');
                    setLocalStorage('customPlayList', $scope.customPlayList);
                    $scope.isLoading = false;
                }
            });
        }

        function init() {
            $scope.isLoading = true;
            getCustomPlayList();
        }

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }

        function setLocalStorage(key, value) {
            localStorage.setItem(key, angular.toJson(value));
        }

        init();
    }]);
})();