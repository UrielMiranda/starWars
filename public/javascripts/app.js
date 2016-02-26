(function(){
'use strict';

 angular.module("myapp",['ngResource'])
 .directive("cardCharacter", cardCharacter)
 .factory('starWarSearch',starWarSearch);

 starWarSearch.$inject = ['$resource'];
 function starWarSearch($resource){
   return $resource('http://swapi.co/api/people/');
 }

cardCharacter.$inject = [];
function cardCharacter(){
  var directive = {
    restrict:"EA",
    templateUrl: "/partials/cards.html",
    controller: cardController,
    controllerAs: 'cardinfo',
    binToController: true,
    replace: true,

  };
  return directive;
}

cardController.$inject = ["starWarSearch"];
function cardController(starWarSearch){
  var cardinfo = this;

  cardinfo.doSearch = doSearch;


  function doSearch(){
    console.log(cardinfo.name);
    starWarSearch.get({'id': cardinfo.name})
    .$promise
      .then(function(response){
        cardinfo.characters = response.results;
        console.log(response.results);
      });
  }
}



})();
