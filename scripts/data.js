var config = require('../config/config');
var mongoose = require('mongoose');
var models = require('../models');

require('mongoose-q')(mongoose);
mongoose.connect(config.db);

(new models.Recipe({
	name: 'Brussels & blue cheese pizza',
	time: 30,

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
})).save();