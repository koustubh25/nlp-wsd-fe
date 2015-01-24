	'use strict';

	var wsdControllers = angular.module('wsdControllers',[]);

	wsdControllers.controller('inputController',['$scope','$http',function($scope,$http){

		//set default values here
		$scope.endpoint = "http://131.113.41.202:8080/nlp-wsd-demo/wsd/disambiguate?";
		$scope.endpointTokenize = "http://131.113.41.202:8080/nlp-wsd-demo/wsd/tokenize?";
		$scope.algorithm = "lesk";
		$scope.sentence = "I went fishing for some sea bass.";
		$scope.targetWord = "";
		$scope.depthValue = 1;
		$scope.fWindow = 0;
		$scope.bWindow = 0;
		$scope.depthFactor = 0.1;
		$scope.synonyms = false;
		$scope.hypernyms = false;
		$scope.hyponyms = false;
		$scope.holonyms = false;
		$scope.meronyms = false;
		$scope.tokens = "";
		$scope.showHeaders = 0;
		$scope.errorSubmit = 0;
	

		console.log($scope.showHeaders);

		$scope.isValid = function()
		{
			if($scope.targetWord.length > 0)
				return true;
			else
				return false;
		}

		$scope.tokenize = function(sentence)
		{
			$scope.tokens = "";
			$scope.targetWord = "";
			$scope.endpointTokenize
			$scope.isTokenLoading = 1; 
			$http.get($scope.endpointTokenize + "sentence=" + $scope.sentence ).
			//$http.get('test.json').
	        success(function(data) {

	        	$scope.errorTokenize = false;
	            $scope.tokens = $.parseJSON(data);
	            
	            $scope.isTokenLoading = 0;
	            
	        }).error(function(data){
	        	$scope.isTokenLoading = 0; 
	        	$scope.errorTokenize = true;
	        });

		}

		$scope.setIndex = function(index,word){
			$scope.index = index;
			$scope.targetWord = word;

		}


		$scope.getSensesAndScores = function()
		{
			//collect parameters for request
			var params;
			$scope.isProgress = 1;
			$scope.errorSubmit = 0;
			$scope.errorTokenize = false;

			//Mandatory parameters
			params = "inputSentence=" + $scope.sentence;
			params += "&targetWord=" + $scope.targetWord;
			params += "&fwindow=" + $scope.fWindow;
			params += "&bwindow=" + $scope.bWindow;
			params += "&indexWord=" + $scope.index;	
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
	        	$scope.errorSubmit = 0;
	        	$scope.showHeaders = 1;
	            $scope.sensesscores = $.parseJSON(data);
	            $scope.isProgress = 0;
	            
	        }).error(function(data){
	        	$scope.errorSubmit = 1;
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