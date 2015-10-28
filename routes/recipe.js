module.exports.init = function (app) {
	app.get('/recipe', function (req, res, next) {
		res.render('recipe/index');
	});
};