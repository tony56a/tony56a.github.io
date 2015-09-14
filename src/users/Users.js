(function(){
	'use strict';

  // Prepare the 'users' module for subsequent registration of controllers and delegates

  angular
  .module('starterApp', ['ngMaterial','ngStorage', 'ngRoute'])
  .config(function($mdThemingProvider, $mdIconProvider){

  	$mdIconProvider
  	.defaultIconSet("./assets/svg/avatars.svg", 128)
  	.icon("menu"       , "./assets/svg/menu.svg"        , 24)
  	.icon("share"      , "./assets/svg/share.svg"       , 24)
  	.icon("google_plus", "./assets/svg/google_plus.svg" , 512)
  	.icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
  	.icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
  	.icon("phone"      , "./assets/svg/phone.svg"       , 512)
  	.icon("spades"     , "./assets/svg/Twemoji_2660.svg", 512)
  	.icon("clubs"     , "./assets/svg/Twemoji_2663.svg" , 512)
  	.icon("hearts"     , "./assets/svg/Twemoji_2665.svg", 512)
  	.icon("diamonds"     , "./assets/svg/Twemoji_2666.svg", 512)
  	.icon("notrumps"     , "./assets/svg/nt.svg", 128);

  	$mdThemingProvider.theme('default')
  	.primaryPalette('green')
  	.accentPalette('blue');

  }).config(function($routeProvider) {
        $routeProvider

            // route for the default page
            .when('/', {
                templateUrl : './src/users/view/default.html',
                controller  : 'defaultController'
            })

            // route for the game detail page
            .when('/games/:gameId', {
                templateUrl : './src/users/view/gamedetail.html',
                controller  : 'GameDetailController'
            })

            // route for the scoring page
            .when('/scoring', {
                templateUrl : './src/users/view/scoring.html',
                controller  : 'scoringController'
            })
            
    });


})();
