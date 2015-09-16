'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the jstestApp
 */
angular.module('jstestApp')
	.controller('HeaderCtrl', ['$scope', 'basketFactory', function($scope, basketFactory) {
		// watch basket
		$scope.$watch(function() {
			return basketFactory.getBasket();
		}, function(newVal, oldVal) {
			$scope.basket = basketFactory.getBasket();

			if ($scope.basket && $scope.basket.length > 0) {
				$scope.totalPrice = 0;
				$scope.main = 0;
				$scope.other = 0;
				$scope.basket.forEach(function (basket) {
					// add total price
					$scope.totalPrice = $scope.totalPrice + basket.price * basket.orders;
					// calculate main and others meals
					if (basket.type == 'main') {
						$scope.main = $scope.main + basket.orders;
					} else {
						$scope.other = $scope.other + basket.orders;
					}
		        });

				$scope.totalPrice = parseFloat($scope.totalPrice).toFixed(2);

			} else {
				// if we have basket created but empty
				$scope.open = false;
				$scope.basket = null;
			}
		}, true);

		$scope.open = false;
		$scope.openHeader = function(obj) {
			if ($scope.basket && obj.target.attributes.data) {
				if ($scope.open) {
					$scope.open = false;
				} else {
					$scope.open = true;
				}
			}
		};

		$scope.addMeal = function(meal){
			basketFactory.addMeal(meal);
		};

		$scope.removeMeal = function(meal){
			basketFactory.removeMeal(meal);
		};
	}]);