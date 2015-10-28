var mongoose = require('mongoose');

['Recipe', 'Ingredient'].forEach(function (schema) {
	module.exports[schema] = mongoose.model(schema, require('./' + schema.toLowerCase()));
});