function MatchController($scope, $http, coupon){
	"use strict";
	
	$http.get('/data/matches.json').then(function(response) {
    	$scope.matches = response.data;
    	$scope.sorter = function(a, b){
			 return a.datetime;
    	}
    	$scope.addToCoupon = function(matchId, betType){
    		coupon.add(matchId, betType);
    		console.log('added');
    	}
	});
};