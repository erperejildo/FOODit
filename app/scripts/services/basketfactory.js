'use strict';

/**
 * @ngdoc service
 * @name jstestApp.Menuservice
 * @description
 * # MenuService
 * Service in the jstestApp.
 */
angular.module('jstestApp')
	.factory('basketFactory', function($cookieStore) {
		var basket  = {};
		basket.meal = {};

		basket.getBasket = function() {
			if ($cookieStore.get('FOODitBasket')) {
				var basket = JSON.parse($cookieStore.get('FOODitBasket'));
			} else {
				var basket = '';
			}
			return basket;
		};

		// save in localstorage
		basket.addMeal = function(meal) {
			var currentBasket = basket.getBasket();

			// meal type (I'm considering two: main and other)
			var typeMeal = 'other';
			if (meal.tags) {
				meal.tags.forEach(function (tag) {
		          if (tag == '#course:main_courses') {
		          	typeMeal = 'main';
		          }
		        });
			}
	        var currentMeal = {
	        	id: meal.id,
				name: meal.name,
				orders: 1,
				price: meal.price,
				type: typeMeal
	        };

			if (!currentBasket) {
				currentBasket = [currentMeal];
			} else {
				var newMeal = true;
				for (var i = 0; i < currentBasket.length; i++) {
					// we have the meal in the basket (+1)
					if (currentBasket[i].id == meal.id) {
						newMeal = false;
						currentBasket[i].orders = currentBasket[i].orders + 1;
						break;
					}
				}
				// add new meal to the basket
				if (newMeal) {
					newMeal = currentMeal;
					currentBasket.push(newMeal);
				}
			}
			$cookieStore.put('FOODitBasket', JSON.stringify(currentBasket));
		};

		basket.removeMeal = function(meal) {
			var currentBasket = basket.getBasket();
			for (var i = 0; i < currentBasket.length; i++) {
				if (currentBasket[i].id == meal.id) {
					if (currentBasket[i].orders == 1) {
						currentBasket.splice(i, 1);
					} else {
						currentBasket[i].orders = currentBasket[i].orders - 1;
					}
					break;
				}
			}
			$cookieStore.put('FOODitBasket', JSON.stringify(currentBasket));
		};

		return basket;
	});