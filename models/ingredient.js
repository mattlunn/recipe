var ingredient = module.exports = new require('mongoose').Schema({
	name: String,
	is_main: Boolean,
	quantity: Number,
	measure: String
});

ingredient.virtual('is_whole').get(function () {
	return this.measure === 'whole';
});