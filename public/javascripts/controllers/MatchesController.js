(function(app){
	app.controller('MatchesController', function($scope, $http){
		$http.get('/data/matches.json').success(function(data) {
	    	$scope.matches = data;
		});
	});
})(app);