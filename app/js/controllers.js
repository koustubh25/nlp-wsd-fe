'use strict';

var wsdControllers = angular.module('wsdControllers',[]);

wsdControllers.controller('inputController',['$scope','$http',function($scope,$http){

	//set default values here
	$scope.endpoint = "localhost";
	$scope.algorithm = "lesk";
	$scope.hypernymValue = "1";
	$scope.hyponymValue = "1";
	$scope.sentence = "test sentence";
	$scope.targetWord = "";
	$scope.depthValue = 1;

	$scope.getSensesAndScores = function()
	{
		//collect parameters for request
		var params;
		$scope.isProgress = 1;

		if($scope.algorithm=="lesk")
		{
			params = "input_sentence" + $scope.sentence + "&";
			params = params + "targetWord" + $scope.targetWord + "&";
			params = params + "POS"
		}





		//call the Rest service
		$http.get('http://localhost:8080/nlp-wsd-demo/wsd/disambiguate').
		//$http.get('test.json').
        success(function(data) {
            $scope.sensesscores = $.parseJSON(data);
            $scope.isProgress = 0;
            console.log(data);
        });

	}

	$scope.updateWord = function(targetWord){
		$scope.targetWord = targetWord;
	}
	

}]);

wsdControllers.controller('outputController',['$scope',function($scope){

	$scope.fieldItems = [

		{
			'sense' : '',
			'score' : 0

		}

	];

}]);