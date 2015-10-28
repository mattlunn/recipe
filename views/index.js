module.exports.init = function (app) {
	var exphbs = require('express-handlebars');

	app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
	app.set('view engine', 'hbs');
};