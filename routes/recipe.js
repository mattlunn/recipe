module.exports.init = function (app) {
	var validator = require('validator');
	var models = require('../models');
	var errors = require('../errors');
	var q = require('q');

	// recipe?name=Lemon&ingredient=Chicken&ingredient=Thyme&time=25&page=1
	app.get(['/recipe', '/'], function (req, res, next) {
		var per = 10;
		var page = 1;
		var filter = {
			ingredients: [],
			name: null,
			time:  Number.MAX_VALUE
		};

		if (typeof req.query.name === 'string' && req.query.name.length) {
			filter.name = req.query.name;
		}

		if (typeof req.query.ingredient === 'string') {
			req.query.ingredient = [req.query.ingredient];
		}

		if (Array.isArray(req.query.ingredient)) {
			for (var i=0;i<req.query.ingredient.length;i++) {
				var element = req.query.ingredient[i];

				if (typeof element === 'string' && element.length) {
					filter.ingredients.push(element);
				}
			}
		}

		if (validator.isInt(req.query.time, {
			min: 1
		})) {
			filter.time = parseInt(req.query.time, 10);
		}

		if (validator.isInt(req.query.page, {
			min: 1
		})) {
			page = parseInt(req.query.page, 10);
		}

		q.all([
			models.Recipe.findAll(filter.name, filter.ingredients, filter.time, page, per),
			models.Recipe.countAll(filter.name, filter.ingredients, filter.time)
		]).spread(function (recipes, count) {
			res.render('recipe/index', {
				recipes: recipes,
				filter: filter,
				count: count,
				page: page,
				pages: Math.ceil(count / per)
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