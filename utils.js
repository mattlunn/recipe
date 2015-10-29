// Kudos: http://stackoverflow.com/a/2593661/444991
module.exports.regexEscape = function (word) {
	return word.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
};