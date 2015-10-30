var should = require('should');
var config = require('../config/config');
var mongoose = require('mongoose');
var models = require('../models');
var q = require('q');

require('mongoose-q')(mongoose);
mongoose.connect(config.db);

describe('Models', function () {
	describe('Recipe', function () {
		describe('#findAll', function () {
			it('should return an empty array when no matches are found', function (done) {
				models.Recipe.findAll('fhoifhefoiwehf', null, null).then(function (results) {
					results.should.be.an.Array();
					results.should.be.empty();

					done();
				}).done();
			});

			it('should match \'name\' against the first word', function (done) {
				models.Recipe.findAll('Lemon', null, null).then(function (results) {
					results[0].name.should.startWith('Lemon');

					done();
				}).done();
			});

			it('should match \'name\' against the nth word', function (done) {
				models.Recipe.findAll('chicken', null, null).then(function (results) {
					results.some(function (a) {
						return a.name === 'Lemon chicken';
					}).should.be.true();

					done();
				}).done();
			});

			it('should match \'ingredient\' against an ingredient', function (done) {
				models.Recipe.findAll(null, ['Chicken', 'Lemon'], null).then(function (results) {
					results.length.should.equal(1);

					['Chicken', 'Lemon'].forEach(function (item) {
						results[0].ingredients.some(function (i) {
							return item === i.name;
						}).should.be.true();
					});

					done();
				}).done();
			});

			it('should respect time', function (done) {
				models.Recipe.findAll(null, null, 27).then(function (results) {
					results.forEach(function (item) {
						item.time.should.be.lessThan(27);
					});

					done();
				}).done();
			});

			it('should match recipes which have the max cooking time', function (done) {
				models.Recipe.findAll(null, null, 25).then(function (results) {
					results.forEach(function (item) {
						item.time.should.be.lessThanOrEqual(25);
					});

					done();
				}).done();
			});

			it('should obey page limits', function (done) {
				q.all([
					models.Recipe.findAll(null, null, null, 1, 1),
					models.Recipe.countAll(null, null, null)
				]).spread(function (ret, actual) {
					ret.length.should.equal(1);
					ret.length.should.be.lessThan(actual);

					done();
				});
			});
		});

		describe('#countAll', function () {
			it('should return 0 when no matches are found', function (done) {
				models.Recipe.countAll('fhoifhefoiwehf', null, null).then(function (count) {
					count.should.equal(0);

					done();
				}).done();
			});

			it('should return a count when recipes match', function (done) {
				models.Recipe.countAll('Lemon', null, null).then(function (count) {
					count.should.equal(1);

					done();
				}).done();
			});
		});

		describe('#findById', function () {
			it('should return null when no record matches', function (done) {
				models.Recipe.findById('4631b5fd9bd615b827a87cff').then(function (recipe) {
					should.equal(recipe, null);

					done();
				}).done();
			});

			it('should return a recipe when a record matches', function (done) {
				models.Recipe.findAll('Lemon', null, null).then(function (results) {
					models.Recipe.findById(results[0].id).then(function (recipe) {
						recipe.id.should.equal(results[0].id);

						done();
					}).done();
				});
			});
		});
	});

	describe('Ingredient', function () {
		function loadRecipe(name) {
			return models.Recipe.findAll(name, null, null, null).then(function (results) {
				return results[0];
			});
		}

		describe('#is_whole', function () {
			it('should return true when ingredient is whole', function (done) {
				loadRecipe('Lemon chicken').then(function (recipe) {
					for (var i=0;i<recipe.ingredients.length;i++) {
						var ingredient = recipe.ingredients[i];

						if (ingredient.name === 'Chicken') {
							ingredient.is_whole.should.be.true();
							ingredient.measure.should.equal('whole');

							done();
						}
					}

					throw new Error();
				});
			});

			it('should return false when ingredient isn\'t whole', function (done) {
				loadRecipe('Lemon chicken').then(function (recipe) {
					for (var i=0;i<recipe.ingredients.length;i++) {
						var ingredient = recipe.ingredients[i];

						if (ingredient.name === 'Thyme') {
							ingredient.is_whole.should.be.false();
							ingredient.measure.should.not.equal('whole');

							done();
						}
					}

					throw new Error();
				});
			});
		});
	});
});