// Rprtr

'use strict';

var rprtr = angular.module('rprtr',[])
  .config(['$routeProvider', function($routeProvider) {
    // $routeProvider.when('/', {templateUrl: 'partials/home.html'});
    $routeProvider.when('/:site', {templateUrl: 'partials/report.html', controller: 'ReportCtrl'});



    $routeProvider.when('/parser', {templateUrl: 'partials/parser/parser.html', controller: 'ParserCtrl'});

    $routeProvider.otherwise({redirectTo: '/kickstarter'});
  }]);

