(function(){
	'use strict';


app.controller("chatRoomCtrl", ["$scope","Auth", "$state", "$rootScope", "chatMessages", "$http", '$log',  function($scope, Auth, $state, $rootScope, chatMessages, $http, $log){
    console.log("chatRoomCtrl loaded");
    var vm = this; // Capture variable

    // Initialize Variables from Factories
    vm.auth = Auth;
    vm.messages = chatMessages;
    // Initialize Variables
    vm.message = "";
    vm.random_0_to_100 = Math.floor(Math.random()*100); // Number from 0 to 99
    vm.isLoggedInOrNot = "Siden du ikke er logget inn vil du vises som 'Guest: " +  vm.random_0_to_100+"'";

    // Functions
    vm.addMessage = addMessage;

    //For $broadcast til alle kontrollere må man bruk $rootScope(husk å inkludere som parameter til funksjonen)
    $rootScope.$broadcast('navBarUpdate', "chat");


    vm.auth.$onAuthStateChanged(function(firebaseUser){
        if(firebaseUser){
            if(firebaseUser.displayName){
                vm.userName = firebaseUser.displayName;
            }else {
                vm.userName = firebaseUser.email;
            }
            console.log("User: ", vm.userName);

            vm.isLoggedInOrNot = "Du vil vises som '" + vm.userName + "'";
        }else {
            if(!vm.userName){
                vm.userName = "Guest "+ vm.random_0_to_100;
            }
            $rootScope.$broadcast('isLogged', "chat");
        }
    });


    function addMessage(){
        vm.messages.$add({
            from: vm.userName,
            content: vm.message,
        });
        vm.message = "";
    }


    /*If no messages in the list makes on entry*/
    vm.messages.$loaded(function() {
        if (vm.messages.length === 0) {
            vm.messages.$add({
            from: "Firebase Docs",
            content: "Hello world!"
            });
        }
    });


    // Make object for request to API

    function testAPI(){
        const proxyurl = "https://cors-anywhere.herokuapp.com/"; // https://tinyurl.com/y9p4bfl6
        const url = 'https://www.worldfitnesslevel.org/service/api/types';

        $http({
            method: 'GET',
            url: proxyurl + url
        })
            .then(function (data, status, header, config) {
                console.log("Successfully called worldfitness API. Data. " + data.data);
                console.log("Testing out education[0].id: " + data.data.educations[0].id);
                console.log(data);
                // console.log(status); // This is undefined
                // console.log(header); // This is undefined
                // console.log(config); // This is undefined
        })
            .catch(function (data, status, header, config) {
                console.log("Error while calling worldfitness API");
            });
    }
    // testAPI();

    function testGetResponseAPI() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/"; // https://tinyurl.com/y9p4bfl6
        const url = 'https://www.worldfitnesslevel.org/service/api/response';
        const data = {
            "userId": "asdf",
            "systemId": "test",
            "responseId": "",             //must be used if you want to update an existing response, or else remove or set blank
            "input": {
                "education": 12,            //see /types
                "ethnicity": 1,             //see /types
                "gender": 1,                //see /types
                "workoutFrequency": 2,      //see /types
                "workoutTime": 2,           //see /types
                "hardness": 3,              //see /types
                "restingPulse": 45,         //beats pr minute
                "maximumHeartRate": 189,    //beats pr minute
                "weight": 83,               //in kilograms
                "height": 187,              //in centimeters
                "age": 37,
                "latitude": 63.4305,        //optional
                "longitude": 10.3951,       //optional
                "city": "Trondheim",        //optional
                "country": "Norway",        //optional
                "group": ""                 //optional - only use group in agreement with API provider
            }
        };

        $http({
            url: proxyurl + url,
            method: 'POST',
            data: data,
            headers: {'Content-Type': 'application/json'},
        }).then(function (data) {
            console.log(data);
        }).catch(function (data, status, headers, config) {
            //todo: report to user
            console.log("Error while doing");
            $log.error({
                data: data,
                status: status,
                headers: headers,
                config: config
            });
        });
    }
    testGetResponseAPI();

}]);// End chatRoomCtrl
})(); // End function scope