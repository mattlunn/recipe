module.exports.NotFound = function () {
	Error.apply(this, arguments);
};

module.exports.NotFound.prototype = new Error();