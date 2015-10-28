var ingredient = module.exports = new require('mongoose').Schema({
	name: String,
	is_main: Boolean,
	quantity: Number,
	measure: String
});