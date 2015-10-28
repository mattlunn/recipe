var config = require('./config/config');
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var server;

// Initialize DB
require('mongoose-q')(mongoose);
mongoose.connect(config.db);

// Boostrap routes and views
require('./routes').init(app);
require('./views').init(app);

server = app.listen(config.port, config.ip, function () {
	var address = server.address();

	console.log('Listening on http://%s:%s', address.address, address.port);
});