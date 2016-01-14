'use strict';

var nlpApp = angular.module('wsd',[

	'wsdControllers',
	'ngAnimate',
	'ngMaterial',
	'ui.router',
	'highcharts-ng',
	'datatables'
	]);



nlpApp.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider){

	$stateProvider.
	state('wsd',{
		url:'/wsd',
		templateUrl : 'partials/wsdAlgorithm.html',
		controller : 'inputController'
	}).
	state('results',{
		url:'/results',
		templateUrl : 'partials/results.html',
		controller : 'resultsController'
	}).
	state('info',{
		url:'/implementationInfo',
		templateUrl : 'partials/info.html',
		controller : 'infoController'
	}).
	state('home',{
		url : '/home',
		templateUrl : 'partials/home.html',
		controller : 'homePageController'
	});

	$urlRouterProvider.otherwise('home');

}]);