// Controllers


rprtr.controller('ReportCtrl',
  ['$scope', '$http', '$location', '$routeParams', 'declarations', 'declarationsByType', 'selectors', 'createUniques',
  function($scope, $http, $location, $routeParams, declarations, declarationsByType, selectors, createUniques) {


    // Setting as a scope variable that can be updated in the view
    if($scope.styleData == null) {
      $location.path('/kickstarter');
      $scope.styleData = 'kickstarter';
      console.log('getting styles for ' + $scope.styleData);
    };

    // Function to get the styles data - This should really go in a factory
    $scope.getStyles = function(styleData) {
      $scope.loading = true;
      $http.get('data/' + styleData + '/rules.json').success(function(res) {
        $scope.styles = res;
        selectors($scope);
      });
      $http.get('data/' + styleData + '/declarations.json').success(function(res){
        $scope.declarations = res;
        // Create arrays for each declaration type in the factory
        declarationsByType($scope);
      });
      $http.get('data/' + styleData + '/unique_declarations.json').success(function(res){
        $scope.uniqueDeclarations = res;
      });
      $scope.$watch('selectors', function(){
        // Wait for selectors to load, then get uniques
        if($scope.selectors) {
          createUniques($scope);
          $scope.loading = false;
        };
      });
    };

    // Getting initial styles data
    $scope.getStyles($scope.styleData);

    $scope.updateStyles = function(url){
      if(url) $scope.styleData = url;
      $scope.getStyles($scope.styleData);
      if($location.path() != '/parser') {
        $location.path('/').search({'site': $scope.styleData});
      };
    };

}]);


rprtr.controller('ParserCtrl', ['$scope', '$http', '$filter', 'declarations', function($scope, $http, $filter, declarations){

  // Controller for parsing the base JSON data and spitting out
  // declarations and unique_declarations

  $scope.styleDataToParse = null;

  // Reset any previously loaded data
  $scope.declarations = null;
  $scope.uniqueDeclarations = null;

  $scope.updateStylesToParse = function(url){
    console.log('getting: ' + 'data/' + $scope.styleDataToParse + '/rules.json');
    $http.get('data/' + $scope.styleDataToParse + '/rules.json').success(function(res) {
      console.log('got: ' + 'data/' + $scope.styleDataToParse + '/rules.json');
      $scope.styles = res;
      declarations($scope);
    });
  };

  $scope.$watch($scope.declarations, function(){
    console.log('found declarations. parsing uniques...');
    $scope.getUniques();
  });

  $scope.getUniques = function(){
    console.log('getting uniques for ' + $scope.styleDataToParse);
    var uniqueFilter = $filter('unique');
    $scope.uniqueDeclarations = uniqueFilter($scope.declarations);
  };

}]);
