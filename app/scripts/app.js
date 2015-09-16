'use strict';

/**
 * @ngdoc overview
 * @name jstestApp
 * @description
 * # jstestApp
 *
 * Main module of the application.
 */
angular
  .module('jstestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  // I understand that each image have a tag and there are problems in the json with the names (and I can't modificate it)
  .directive('fallbackSrc', function() {
    var fallbackSrc = {
      link: function postLink(scope, iElement, iAttrs) {
        iElement.bind('error', function() {
          angular.element(this).attr('style', 'display:none');
        });
      }
    }
    return fallbackSrc;
  });