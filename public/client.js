var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope, $http) {

	//CREATES DYNAMIC TABLE DEPENDING ON RESULT
	function createTable(list) {

		//GET ALL KEYS (USE FOR COLUMN HEADERS)
		var keys = [];

		for (var k in list[0]){
		    if (list[0].hasOwnProperty(k)) {
		        keys.push(k);
		    }
		}

		//SET COLUMN HEADERS
		$scope.columnheaders = keys;
		
		//SET OUR LIST (RESPONSE) TO RESULT
		$scope.result = list;		
	}


    //GET ALL TWEETS
    $scope.getAllTweets = function() {
        $http.get("/getalltweets")
            .then(function(res) {
            	var list = res.data;
            	createTable(list);
            })
    }

    //GET USERS
    $scope.getusers = function() {
        $http.get("/getusers")
            .then(function(res) {
            	var list = res.data;
            	createTable(list);
            })
    }

    //GET TWEET BY ID
    $scope.gettweetbyid = function() {
        $http.get("/gettweet/" + $scope.tweetid)
            .then(function(res) {
            	var list = res.data;
            	createTable(list);
            })
    }

    //GET DETAILS ABOUT USER VIA NAME
    $scope.getuserbyname = function() {
        $http.get("/getuser/" + $scope.name)
            .then(function(res) {
            	var list = res.data;
            	console.log(list);
            	createTable(list);
            })
    }

    $scope.getlinks = function() {
        $http.get("/getlinks")
            .then(function(res) {
            	var list = res.data;
            	createTable(list);
            })
    }
});