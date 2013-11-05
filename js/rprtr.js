// Rprtr

'use strict';

var rprtr = angular.module('rprtr',[])
  .config(['$routeProvider', function($routeProvider) {
    // $routeProvider.when('/', {templateUrl: 'partials/home.html'});
    $routeProvider.when('/sites', {templateUrl: 'partials/sites.html', controller: 'SitesCtrl'});
    $routeProvider.when('/parser', {templateUrl: 'partials/parser/parser.html', controller: 'ParserCtrl'});

    $routeProvider.when('/:site', {templateUrl: 'partials/report.html', controller: 'ReportCtrl'});

    $routeProvider.otherwise({redirectTo: '/sites'});
  }]);

