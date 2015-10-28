var ingredient = require('./ingredient');
var recipe = module.exports = new require('mongoose').Schema({
	name: String,
	time: Number,
	image: String,

	ingredients: [ingredient]
});

recipe.statics.findAll = function () {
	return this.findQ();
};

recipe.statics.findById = function (id) {
	return this.findOneQ({
		_id: id
	});
};