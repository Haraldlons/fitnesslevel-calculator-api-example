console.log("app.js loaded");

var app = angular.module("sampleApp", [
	"ui.router", 
	"ngMaterial",
	"ngMessages",
    "ngAria",
	]);


app.config(["$stateProvider", "$urlRouterProvider", "$mdThemingProvider",
  function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    console.log("stateProvider loaded");

    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

    $mdThemingProvider.theme("success-toast");
    $mdThemingProvider.theme("error-toast");
    $mdThemingProvider.theme("pending-toast");

    $urlRouterProvider.when('', '/home');
    $urlRouterProvider.when('/#!/', '/home');
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state("home", {
        url: "/home",
        // the rest is the same for ui-router and ngRoute...
        controller: "mainController as vm",
        templateUrl: "components/home.html",
    })
    .state("chat", {
        url: "/chat",
        controller: "chatRoomCtrl as vm",
        templateUrl: "components/chatRoom/chatRoom.html",
    });

}]);

