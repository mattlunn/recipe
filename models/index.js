var mongoose = require('mongoose');

// Load all application models
['Recipe', 'Ingredient'].forEach(function (schema) {
	module.exports[schema] = mongoose.model(schema, require('./' + schema.toLowerCase()));
});