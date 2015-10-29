module.exports.init = function (app) {
	var validator = require('validator');
	var models = require('../models');
	var errors = require('../errors');
	var q = require('q');

	app.get(['/recipe', '/'], function (req, res, next) {
		models.Recipe.findAll().then(function (recipes) {
			res.render('recipe/index', {
				recipes: recipes
			});
		}).done();
	});

	app.get('/recipe/view/:id', function (req, res, next) {

		(function () {
			if (validator.isMongoId(req.params.id)) {
				return models.Recipe.findById(req.params.id);
			} else {
				return q.reject(new errors.NotFound());
			}
		}()).then(function (recipe) {
			if (recipe == null) {
				return q.reject(new errors.NotFound());
			}

			res.render('recipe/view', {
				recipe: recipe
			});
		}).fail(function (error) {
			if (error instanceof errors.NotFound) {
				res.status(404).render('recipe/error');
			}
		}).done();
	});
};