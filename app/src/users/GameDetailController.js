( function(){
    'use strict';

  angular
       .module('starterApp' )
       .controller('GameDetailController',
          ['$scope', '$routeParams', '$localStorage','$q',
          GameDetailController
     	]);

  function GameDetailController( $scope, $routeParams,$localStorage,$q ){
  	var self = this;

  	$scope.$storage = $localStorage;
  	$scope.game = $scope.$storage.games[$routeParams.gameId];
  	self.resultToStr = resultToStr;
    self.bonusToStr = bonusToStr;
    self.setGameContractValue = setGameContractValue;
    self.setGameResult = setGameResult;

    function setGameContractValue(key,value){
    	$scope.game.contract[key] = value;
    }
 
    function setGameResult( value ){
    	$scope.game.result = value;
    }

    function bonusToStr(bonus){
        var returnValue = "";
        switch( bonus ){
          case 0:
            returnValue = 'None';
            break;
          case 1:
            returnValue = 'Doubled';
            break;
          case 2:
            returnValue = 'Redoubled';
            break;
           default:
           	returnValue = 'Blah';
           	break;
        }

        return returnValue;
    }

    function resultToStr(result){
        var returnValue = "";
        if( result == 0 ){
          returnValue = "Made Contract";
        } else if( result < 0){
          returnValue = "Down by " + Math.abs(result);
        } else{
          returnValue = "Over by " + Math.abs(result);
        }
        return returnValue;
    }
  }

})();