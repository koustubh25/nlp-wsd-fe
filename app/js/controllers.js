	'use strict';

	var wsdControllers = angular.module('wsdControllers',[]);

	wsdControllers.controller('inputController',['$scope','$http',function($scope,$http){

		//set default values here
		//$scope.endpoint = "http://131.113.41.202:8080/nlp-wsd-demo/wsd/disambiguate?";
		//$scope.endpointTokenize = "http://131.113.41.202:8080/nlp-wsd-demo/wsd/tokenize?";
		$scope.endpoint = "http://131.113.41.195:8080/nlp-wsd-demo/wsd/disambiguate?";
		$scope.endpointTokenize = "http://131.113.41.195:8080/nlp-wsd-demo/wsd/tokenize?";
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
		$scope.intersecExp = 1;
		

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
			if($scope.algorithm=="extLesk" || $scope.algorithm=="extLeskCont" || $scope.algorithm=="extLeskCont2")
			{

				params += "&synonyms=" + $scope.synonyms;
				params += "&hypernyms=" + $scope.hypernyms;
				params += "&hyponyms=" + $scope.hyponyms;
				params += "&holonyms=" + $scope.holonyms;
				params += "&meronyms=" + $scope.meronyms;
				params += "&depthValue=" + $scope.depthValue;
				params += "&depthFactor=" + $scope.depthFactor/10;
				
			}
			if($scope.algorithm == "extLeskCont2")
			{
				params += "&intersecExp=" + $scope.intersecExp;
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

	wsdControllers.controller('infoController',['$scope',function($scope){
		$scope.comp=1;

	}]);

	wsdControllers.controller('resultsController',['$scope','$http',function($scope,$http){

		
		//plot accuracy vs PoS per technique
		$http.get('data/accuracyPoSPerTechnique.json').
		success(function(data) {
			console.log(data);
			
			$scope.accuracyPoSPerTechnique = {

				series: data,
				title: {
					text: 'Accuracy vs PoS per technique'
				},
				xAxis: {
					categories: ['Lesk Basic', 'Lesk Basic Contextual', 'Lesk Extended', 'Lesk Extended Contextual', 'Lesk Extended Contextual 2']
				},
				loading: false
			}
		});

		//plot accuracy vs Polysem per Technique
		$http.get('data/accuracyPolysemyPerTechnique.json').
		success(function(data) {
			console.log(data);
			
			$scope.accuracyPolysemyPerTechnique = {

				series: data,
				title: {
					text: 'Accuracy vs Polysemy per technique'
				},
				xAxis: {
					categories: ['3 senses',' 4 senses','5 senses','7 senses', '9 senses','13 senses', '16 senses']
				},
				loading: false
			}
		});

		//plot Windows size vs technique
		$http.get('data/windowSizePerTechnique.json').
		success(function(data) {
			console.log(data);
			
			$scope.windowSizePerTechnique = {

				series: data,
				yAxis: {min: 51, max: 56},
				title: {
					text: 'Accuracy vs Window size'
				},
				xAxis: {
					categories: ['Lesk Extended Contextual' , 'Lesk Extended Contextual 2']
				},
				loading: false
			}
		});

		//plot accuracy vs depth
		$http.get('data/coverageDepthPerTechnique.json').
		success(function(data) {
		
			
			$scope.coverageDepthPerTechnique = {

				series: data,
				yAxis: {min: 90, max: 99},
				title: {
					text: 'Coverage vs Depth Level per Technique'
				},
				xAxis: {
					categories: ['Lesk Extended' , 'Lesk Extended Contextual' , 'Lesk Extended Contextual 2']
				},
				loading: false
			}
		});

		//plot performances vs technique
		$http.get('data/performancesPerTechnique.json').
		success(function(data) {
			$scope.performancesPerTechnique = {

				series: data,
				
				title: {
					text: 'Performances against Techniques'
				},
				xAxis: {
					categories: ['F Measure' , 'Accuracy' , 'Precision']
				},
				//loading: false
			}
		});


	}]);


