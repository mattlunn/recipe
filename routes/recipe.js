module.exports.init = function (app) {
	var models = require('../models');

	app.get('/recipe', function (req, res, next) {
		models.Recipe.findAll().then(function (recipes) {
			res.render('recipe/index', {
				recipes: recipes
			});
		}).done();
	});

	app.get('/recipe/view/:id', function (req, res, next) {
		models.Recipe.findById(req.params.id).then(function (recipe) {
			res.render('recipe/view', {
				recipe: recipe
			});
		}).done();
	});
};