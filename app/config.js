(function () {
    "use strict";
    musicApp.config(['$urlRouterProvider','$stateProvider', function ($urlRouterProvider,$stateProvider) {
        $urlRouterProvider.otherwise(STATE.ALL_SONGS_LIST);
        $stateProvider
        .state(STATE.PARENT_STATE, {
            url: '/',
          templateUrl: "app/views/navigation-bar.html",
          controller: ''
        })
        .state(STATE.PARENT_STATE +'.' +STATE.ALL_SONGS_LIST, { 
            url: STATE.ALL_SONGS_LIST,
          templateUrl: "app/views/all-songs-listing.html",
          controller: 'allSongsListingController'
        })
        .state(STATE.PARENT_STATE +'.' + STATE.CUSTOM_PLAY_LIST, {
          url: STATE.CUSTOM_PLAY_LIST,
        templateUrl: "app/views/play-list-listing.html",
        controller: 'playListListingController'
      })
    }]);
  })();
  