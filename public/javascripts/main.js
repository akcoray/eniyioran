'use strict';

require.config({
	baseUrl : '/javascripts',
	paths : {
		'angular' : 'lib/angular.min',
		'bootstrap' : 'lib/bootstrap.min',
		'jquery' : 'lib/jquery-2.1.3.min'
	},
	shim : {
		'angular' : {
			exports : 'angular',
			deps : ['jquery']
		},
		'jquery' : {
			exports : '$'
		},
		'bootstrap' : {
			deps : ['jquery'],
			exports : 'bootstrap'
		},
		'app' : {
			deps : ['jquery', 'bootstrap', 'angular'],
			exports : 'app'
		}
	}
});

require(['app'], function(app) {
	debugger
});
