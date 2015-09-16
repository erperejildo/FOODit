'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jstestApp
 */
angular.module('jstestApp')
	.controller('MainCtrl', ['$scope', 'MenuService', 'basketFactory', function($scope, MenuService, basketFactory) {
		$scope.menu = {};
		MenuService.get('/data/menu.json').success(function(data) {
			$scope.menu = data;
			// fix tag problems (mutiple forms)
			$scope.tags = $scope.menu;
		});

		$scope.addToBasket = function(meal) {
			basketFactory.addMeal(meal);
		};

	}]);