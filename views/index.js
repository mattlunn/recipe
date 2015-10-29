module.exports.init = function (app) {
	var exphbs = require('express-handlebars');

	app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: require('./helpers') }));
	app.set('view engine', 'hbs');
};