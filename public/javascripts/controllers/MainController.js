(function(app){
	'use strict'
	app.controller('MainController', function($scope){
		$scope.currencies = [
			{
				name : 'USD',
				value  : 3.004			
			},
			{
				name : 'EURO',
				value  : 3.340			
			}			
		];
	});
})(app);