var config = require('./config/config');
var express = require('express');
var app = express();
var server;

require('./routes').init(app);
require('./views').init(app);

server = app.listen(config.port, config.ip, function () {
	var address = server.address();

	console.log('Listening on http://%s:%s', address.address, address.port);
});