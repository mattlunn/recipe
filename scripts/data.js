var config = require('../config/config');
var mongoose = require('mongoose');
var models = require('../models');

require('mongoose-q')(mongoose);
mongoose.connect(config.db);

(new models.Recipe({
	name: 'Beans on Toast',
	time: 30,

	ingredients: [new models.Ingredient({
		name: 'Beans',
		is_main: true,
		quantity: 1,
		measure: 'whole'
	}), new models.Ingredient({
		name: 'Bread',
		is_main: true,
		quantity: 2,
		measure: 'whole'
	}), new models.Ingredient({
		name: 'Butter',
		is_main: false,
		quantity: 1,
		measure: 'whole'
	})]
})).save();