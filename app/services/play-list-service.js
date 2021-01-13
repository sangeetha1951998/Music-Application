(function () {
    "use strict";

    musicApp.service('playListService', ['$http', function ($http) {

        this.getSongsList = function () {
            return $http.get('https://jsonplaceholder.typicode.com/photos');
        }

        this.getCustomPlayList = function () {
            return $http.get('https://jsonplaceholder.typicode.com/albums');
        }
    }]);
})();