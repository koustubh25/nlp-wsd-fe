  $( document ).ready(function() {

  	//Identifying the clicked word
  	$("#sentence").click(function(){

  		var s = window.getSelection();
  		s.modify('extend','backward','word');        
  		var b = s.toString();

  		s.modify('extend','forward','word');
  		var a = s.toString();
  		s.modify('move','forward','character');

  		//get angular controller
  		var element = angular.element($("#sentence"));
  		var controller = element.controller();
  		var scope = element.scope();

     //chnage the angular variable
     scope.$apply(function(){
     	scope.updateWord(b+a);
     });


 });
  });