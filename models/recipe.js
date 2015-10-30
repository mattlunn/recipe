var utils = require('../utils');
var ingredient = require('./ingredient');
var recipe = module.exports = new require('mongoose').Schema({
	name: String,
	time: Number,
	image: String,

	ingredients: [ingredient]
});

/**
 * Used to build the criteria object to render the /recipe page
 *
 * @param name String 'Name' search term of the recipe. Pass null/ undefined if not
 *        applicable. If provided, will do a "word starts with ___" filter
 * @param ingredients [String] 'Ingredient' search term(s) of the recipe. AND'd
 *        together. Pass null/ undefined/ empty array if not applicable
 * @param time Number 'Max Cooking Time' search filter for the recipe. Pass null/ undefined
 *        if not applicable.
 * @return object Search criteria
 */
function buildCriteria(name, ingredients, time) {
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

	return criteria;
}

/**
 * Returns a page of Recipe's which match the provided search terms.
 *
 * @param name String 'Name' search term of the recipe. Pass null/ undefined if not
 *        applicable. If provided, will do a "word starts with ___" filter
 * @param ingredients [String] 'Ingredient' search term(s) of the recipe. AND'd
 *        together. Pass null/ undefined/ empty array if not applicable
 * @param time Number 'Max Cooking Time' search filter for the recipe. Pass null/ undefined
 *        if not applicable.
 * @param page Number The page of results we want
 * @param per Number The amount of results we want per page
 * @return Promise Resolves to provide an array of Recipe models matching the criteria.
 */
recipe.statics.findAll = function (name, ingredients, time, page, per) {
	return this.find(buildCriteria(name, ingredients, time)).limit(per).skip((page * per) - per).sort({
		name: 1
	}).execQ();
};

/**
 * Counts how many Recipe's match the given criteria.
 *
 * @param name String 'Name' search term of the recipe. Pass null/ undefined if not
 *        applicable. If provided, will do a "word starts with ___" filter
 * @param ingredients [String] 'Ingredient' search term(s) of the recipe. AND'd
 *        together. Pass null/ undefined/ empty array if not applicable
 * @param time Number 'Max Cooking Time' search filter for the recipe. Pass null/ undefined
 *        if not applicable.
 * @return Promise Resolves to provide a count of Recipe models matching the criteria.
 */
recipe.statics.countAll = function (name, ingredients, time) {
	return this.count(buildCriteria(name, ingredients, time)).execQ();
};

/**
 * Returns the model which matches the ID
 *
 * @param id String The ID of the model we want to retrieve
 * @return Promise Resolves to either null if the ID doesn't exist, or the Recipe model
 */
recipe.statics.findById = function (id) {
	return this.findOneQ({
		_id: id
	});
};

/**
 * Makes up a method/ recipe steps to give some substance to the /view page...
 *
 * @return [String] Where each element is a theoretical step in our method.
 */
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