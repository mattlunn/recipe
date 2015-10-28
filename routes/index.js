module.exports.init = function (app) {
	['recipe'].forEach(function (file) {
		module.exports[file] = require('./' + file).init(app);
	});
};