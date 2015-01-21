'use strict';

var wsdControllers = angular.module('wsdControllers',[]);

wsdControllers.controller('inputController',['$scope',function($scope){

	//set default values here

	$scope.algorithm = "lesk";
	$scope.hypernymValue = "1";
	$scope.hyponymValue = "1";


	

}]);

wsdControllers.controller('outputController',['$scope',function($scope){

	$scope.fieldItems = [

		{
			'sense' : '',
			'score' : 0

		}

	];

}]);