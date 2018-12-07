(function(){
	'use strict';

    app.controller("mainController", ["$scope","$mdToast", "$mdDialog", "$state", "$http", "$log",
        function($scope, $mdToast, $mdDialog, $state, $http, $log){
        console.log("mainController loaded");
        var vm = this; // Capture variable

        // Default values
        vm.system_id = "test";
        vm.education_id = 12;
        vm.ethnicity_id = 1;
        vm.age = 37;
        vm.gender_id = 1;
        vm.workoutTime_id = 2;
        vm.workoutFrequency_id = 2;
        vm.hardness_id = 3;
        vm.restingPulse = 45;
        vm.maximumHeartRate = 189;
        vm.weight = 83;
        vm.height = 187;
        vm.checked = true;
        vm.disableSystemID = true;
        vm.gotSuccessResponseFromAPI = false;
        vm.gotFailedResponseFromAPI = false;
        vm.currentNavItem = 'homeName'; // Is used in header


        vm.showToast = function showToast(message, time, type){
            $mdToast.show(
                $mdToast.simple()
                        .content(message)
                        .position('top, right')
                        .hideDelay(time * 1000)
                        .theme(type + "-toast")
                );
        };


        function testGetResponseAPI() {
            const proxyurl = "https://cors-anywhere.herokuapp.com/"; // https://tinyurl.com/y9p4bfl6
            const url = 'https://www.worldfitnesslevel.org/service/api/response';
            const data = {
                "userId": "asdf",
                "systemId": vm.system_id,
                "responseId": "",             //must be used if you want to update an existing response, or else remove or set blank
                "input": {
                    "education": vm.education_id,            //see /types
                    "ethnicity": vm.ethnicity_id,             //see /types
                    "gender": vm.gender_id,                //see /types
                    "workoutFrequency": vm.workoutFrequency_id,      //see /types
                    "workoutTime": vm.workoutTime_id,           //see /types
                    "hardness": vm.hardness_id,              //see /types
                    "restingPulse": vm.restingPulse,         //beats pr minute
                    "maximumHeartRate": vm.maximumHeartRate,    //beats pr minute
                    "weight": vm.weight,               //in kilograms
                    "height": vm.height,              //in centimeters
                    "age": vm.age,
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
                vm.showToast("Successfully called API", 5, "success");
                console.log(data);
                vm.gotSuccessResponseFromAPI = true;
                vm.gotFailedResponseFromAPI = false;
                vm.response = data.data;
            }).catch(function (data, status, headers, config) {
                vm.showToast("Error requesting data from API", 5, "error");
                console.log("Error while calling API");
                vm.gotSuccessResponseFromAPI = false;
                vm.gotFailedResponseFromAPI = true;
                $log.error({
                    data: data,
                    status: status,
                    headers: headers,
                    config: config
                });
            });
        }


        vm.callAPI = function () {
            console.log("Calling API with current variables");
            vm.showToast("Calling API. Please wait...", 0.6, "pending");
            vm.gotSuccessResponseFromAPI = false;
            vm.gotFailedResponseFromAPI = false;
            testGetResponseAPI();
        };


        vm.valueOptions = {
            education: [
                {
                    id: 1,
                    value: "1",
                    text: "Primary school 7-10 years"
                },
                {
                    id: 2,
                    value: "2",
                    text: "Continuation school"
                },
                {
                    id: 3,
                    value: "3",
                    text: "Folk high school"
                },
                {
                    id: 4,
                    value: "4",
                    text: "High school"
                },
                {
                    id: 5,
                    value: "5",
                    text: "Intermediate school"
                },
                {
                    id: 6,
                    value: "6",
                    text: "Vocational school"
                },
                {
                    id: 7,
                    value: "7",
                    text: "1-2 years high school"
                },
                {
                    id: 8,
                    value: "8",
                    text: "University qualifying examination"
                },
                {
                    id: 9,
                    value: "9",
                    text: "Junior college"
                },
                {
                    id: 10,
                    value: "10",
                    text: "A levels University or other post-secondary education"
                },
                {
                    id: 11,
                    value: "11",
                    text: "Less than 4 years University/college"
                },
                {
                    id: 12,
                    value: "12",
                    text: "4 years or more University/college"
                }
            ],
            ethnicity: [
                {
                    id: 1,
                    value: "white",
                    text: "White"
                },
                {
                    id: 2,
                    value: "hispanic_or_latino",
                    text: "Hispanic or Latino"
                },
                {
                    id: 3,
                    value: "black_or_african_american",
                    text: "Black or African American"
                },
                {
                    id: 4,
                    value: "native_american_or_american_indian",
                    text: "Native American or American Indian"
                },
                {
                    id: 5,
                    value: "asian_pacific_islander",
                    text: "Asian / Pacific Islander"
                },
                {
                    id: 6,
                    value: "other",
                    text: "Other"
                }
            ],
            gender: [
                {
                    id: 1,
                    value: "MALE",
                    text: "Male"
                },
                {
                    id: 2,
                    value: "FEMALE",
                    text: "Female"
                }
            ],
            workoutFrequency: [
                {
                    id: 1,
                    value: 0,
                    text: "Almost never or less than once a week"
                },
                {
                    id: 2,
                    value: 1,
                    text: "Once a week"
                },
                {
                    id: 3,
                    value: 2,
                    text: "2-3 times a week"
                },
                {
                    id: 4,
                    value: 3,
                    text: "Almost every day"
                }
            ],
            workoutTime: [
                {
                    id: 1,
                    value: 1,
                    text: "Under 30 min"
                },
                {
                    id: 2,
                    value: 1.5,
                    text: "30 minutes or more"
                }
            ],
            hardness: [
                {
                    id: 1,
                    value: 1,
                    text: "I take it easy without breathing hard or sweating"
                },
                {
                    id: 2,
                    value: 5,
                    text: "Little hard breathing and sweating"
                },
                {
                    id: 3,
                    value: 10,
                    text: "I go all out"
                }
            ]
        };

    }]); // End Ctrl
})();