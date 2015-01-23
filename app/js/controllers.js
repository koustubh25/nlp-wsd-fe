'use strict';

var wsdControllers = angular.module('wsdControllers',[]);

wsdControllers.controller('inputController',['$scope','$http',function($scope,$http){

	//set default values here
	$scope.endpoint = "http://localhost:8080/nlp-wsd-demo/wsd/disambiguate?";
	$scope.algorithm = "lesk";
	$scope.sentence = "test sentence";
	$scope.targetWord = "";
	$scope.depthValue = 1;
	$scope.fWindow = 0;
	$scope.bWindow = 0;
	$scope.depthFactor = 0;
	$scope.synonyms = false;
	$scope.hypernyms = false;
	$scope.hyponyms = false;
	$scope.holonyms = false;
	$scope.meronyms = false;




	$scope.getSensesAndScores = function()
	{
		//collect parameters for request
		var params;
		$scope.isProgress = 1;

		//Mandatory parameters
		params = "inputSentence=" + $scope.sentence;
		params += "&targetWord=" + $scope.targetWord;
		params += "&algo=" + $scope.algorithm;
		
		//Formulate query based on th parameters
		if($scope.algorithm=="extLesk" || $scope.algorithm=="extLeskCont")
		{

			params += "&synonyms=" + $scope.synonyms;
			params += "&hypernyms=" + $scope.hypernyms;
			params += "&hyponyms=" + $scope.hyponyms;
			params += "&holonyms=" + $scope.holonyms;
			params += "&meronyms=" + $scope.meronyms;
			params += "&depthValue=" + $scope.depthValue;
			params += "&depthFactor=" + $scope.depthFactor/10;
			
		}

		//call the Rest service
		$http.get($scope.endpoint + params ).
		//$http.get('test.json').
        success(function(data) {
            $scope.sensesscores = $.parseJSON(data);
            $scope.isProgress = 0;
            
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