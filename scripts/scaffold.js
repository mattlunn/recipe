var config = require('../config/config');
var mongoose = require('mongoose');
var models = require('../models');
var q = require('q');

require('mongoose-q')(mongoose);
mongoose.connect(config.db);

q.all([
	(new models.Recipe({
		name: 'Lemon chicken',
		time: 30,
		image: 'images/recipes/default.jpg',

		ingredients: [new models.Ingredient({
			name: 'Chicken',
			is_main: true,
			quantity: 1,
			measure: 'whole'
		}), new models.Ingredient({
			name: 'Lemon',
			is_main: true,
			quantity: 1,
			measure: 'whole'
		}), new models.Ingredient({
			name: 'Thyme',
			is_main: false,
			quantity: 1,
			measure: 'tsp'
		})]
	})).save(),

	(new models.Recipe({
		name: 'Chicken Caesar Salad',
		time: 25,
		image: 'images/recipes/default.jpg',

		ingredients: [new models.Ingredient({
			name: 'Lettuce',
			is_main: true,
			quantity: 1,
			measure: 'handful'
		}), new models.Ingredient({
			name: 'Croutons',
			is_main: false,
			quantity: 1,
			measure: 'cup'
		}), new models.Ingredient({
			name: 'Parmesan',
			is_main: false,
			quantity: 1,
			measure: 'handful'
		})]
	})).save(),

	(new models.Recipe({
		name: 'Beef Stroganoff',
		time: 30,

		ingredients: [new models.Ingredient({
			name: 'Beef',
			is_main: true,
			quantity: 200,
			measure: 'grams'
		}), new models.Ingredient({
			name: 'Mustard',
			is_main: false,
			quantity: 1,
			measure: 'tsp'
		}), new models.Ingredient({
			name: 'Mushrooms',
			is_main: true,
			quantity: 1,
			measure: 'cup'
		})]
	})).save(),

	(new models.Recipe({
		name: 'Brussels & blue cheese pizza',
		time: 30,
		image: 'images/recipes/default.jpg',

		ingredients: [new models.Ingredient({
			name: 'Semolina',
			is_main: false,
			quantity: 1,
			measure: 'tbsp'
		}), new models.Ingredient({
			name: 'Flour',
			is_main: true,
			quantity: 300,
			measure: 'grams'
		}), new models.Ingredient({
			name: 'Blue cheese',
			is_main: true,
			quantity: 75,
			measure: 'grams'
		}), new models.Ingredient({
			name: 'Blue cheese',
			is_main: true,
			quantity: 75,
			measure: 'grams'
		}), new models.Ingredient({
			name: 'Garlic cloves',
			is_main: true,
			quantity: 2,
			measure: 'whole'
		})]
	})).save()
]).then(function () {
	process.exit(0);
});