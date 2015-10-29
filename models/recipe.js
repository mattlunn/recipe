var utils = require('../utils');
var ingredient = require('./ingredient');
var recipe = module.exports = new require('mongoose').Schema({
	name: String,
	time: Number,
	image: String,

	ingredients: [ingredient]
});

recipe.statics.findAll = function (name, ingredients, time) {
	var criteria = {};

	if (typeof name === 'string') {
		criteria.name = new RegExp('\\b' + utils.regexEscape(name), 'i');
	}

	if (typeof time === 'number') {
		criteria.time = {
			$lt: time
		};
	}

	if (Array.isArray(ingredients) && ingredients.length) {
		criteria.ingredients = {
			$all: ingredients.map(function (ingredient) {
				return {
					$elemMatch: {
						name: ingredient
					}
				};
			})
		};
	}

	return this.findQ(criteria);
};

recipe.statics.findById = function (id) {
	return this.findOneQ({
		_id: id
	});
};

recipe.virtual('steps').get(function () {
	var that = this;
	var ret = [];
	var strings = [
		'Preheat the oven to 200 degrees',
		'Divide the mixture into %d parts',
		'Whilst the %i cook, fry the %i for %d minutes',
		'Tip the %i in with the %i',
		'Rinse the %i with water',
		'Pour the remaining %i in with the %i',
		'Rub the %i over the %i',
		'Cut the %i',
		'Prepare the %i',
		'Add some water to the %i',
		'Leave the %i in the oven for %d minutes',
		'Boil a large saucepan of water',
		'Season the %i with salt and pepper',
		'Cover with foil, and place in the oven for %d minutes',
		'Put the %i in a saucepan and pour over enough water to cover them',
		'Gradually whisk in the %i using a balloon whisk if you have one',
		'Spoon the %i on top and sprinkle with %i',
		'Grill until brown',
		'Using a sharp knife, dice the %i',
		'In preparation for the %i, line a baking sheet with parchment',
		'Pour in %dml warm water and the %i, then mix to a rough dough and set aside for %d mins',
	];

	for (var i=0;Math.random() > i/50;i++) {
		var curr = '';

		for (var j=0;Math.random() > j/5;j++) {
			curr += strings[Math.floor(Math.random() * strings.length)].replace(/(%[id])/g, function (match) {
				switch (match) {
					case '%i':
						return that.ingredients[Math.floor(Math.random() * that.ingredients.length)].name;
					case '%d':
						return Math.round(Math.random() * 180);
				}
			}) + '. ';
		}

		ret.push(curr);
	}

	return ret;
});