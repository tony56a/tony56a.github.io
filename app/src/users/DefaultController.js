( function(){
    'use strict';

  angular
       .module('starterApp' )
       .controller('defaultController', function($scope) {
        // create a message to display in our view
        $scope.message = 'No Game Selected';
    });

})();