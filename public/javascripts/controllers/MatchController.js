function MatchController($scope, $http, coupon){
	"use strict";

	$http.get('/data/matches.json').then(function(response) {
    	$scope.competitions = response.data;
    	$scope.sorter = function(a, b){
			 return a.datetime;
    	}
    	$scope.addToCoupon = function(match, betType){
    		coupon.add(match, betType);
    		console.log('added');
    	}
	});
};