(function(){
    'use strict';

  angular
       .module('starterApp' )
       .controller('UserController', [
          '$scope', '$mdSidenav', '$mdBottomSheet', '$log', '$localStorage','$mdDialog','$location','$q',
          UserController
       ]).
       controller('DialogController',[
          '$scope,$mdDialog', DialogController
        ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( $scope, $mdSidenav, $mdBottomSheet, 
                           $log,$localStorage, $mdDialog, $location,
                           $q) {
    var self = this;
    self.selected = null;
    self.toggleList = toggleGameList;
    self.addGame   = addGame;
    self.showGame = showGame;
    self.resetGames = resetGames;
    self.updatePlayers = updatePlayers;
    self.resultToStr = resultToStr;
    self.bonusToStr = bonusToStr;

    $scope.$storage = $localStorage.$default({
          games : {},
          players : [ "Player 1" , "Player 2"],
          gameNum : 1,
          gameDate : new Date().getTime()
    });


    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleGameList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    function bonusToStr(bonus){
        var returnValue = "";
        switch( bonus ){
          case 0:
            returnValue = "None";
            break;
          case 1:
            returnValue = "Doubled";
            break;
          case 2:
            returnValue = "Redoubled";
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

    function addGame(){
      $scope.$storage.games[$scope.$storage.gameDate.toString() + $scope.$storage.gameNum.toString() ] =
                            { "gameNum" : $scope.$storage.gameNum,
                              "gameDate" :$scope.$storage.gameDate,
                              "players" : $scope.$storage.players.slice(),
                              "contract" : { "suit" : "notrumps", "num" : 1,
                                             "bonus" : 0 },
                              "result" : 0  };
      $scope.$storage.gameNum++;
    }

    function showGame( game ){
      self.selected = game;

      $location.path('games/'+game.gameDate.toString()+game.gameNum.toString());
      self.toggleList();
    }

    function resetGames(){
      $localStorage.$reset({
          games : {},
          players : [ "Player 1" , "Player 2"],
          gameDate : new Date().getTime(),
          gameNum : 1,

      });
      $location.path('/');
    }

    function updatePlayers($event){

      $mdDialog.show({
      controller: DialogController,
      templateUrl: './src/users/view/updatePlayerDialog.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.$storage.players = [ answer.player1, answer.player2 ];
      $scope.$storage.gameDate = new Date().getTime();
      $scope.$storage.gameNum = 1;
          $location.path('/');

    });

  }

  }

function DialogController($scope, $mdDialog) {
    $scope.participant = {
      player1: 'player 1',
      player2: 'player 2',
    };

    $scope.hide = function() {
      $mdDialog.hide($scope.participant);
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }


}

)();
