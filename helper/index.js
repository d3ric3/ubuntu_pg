if (!global.hasOwnProperty('helper')) {
	//init if not exists
	var hash = require('./hash');
	var guid = require('./guid');
	var authParser = require('./auth');
	var crypto = require('./crypto');

	global.helper = {
		hash: hash,
		guid: guid,
		authParser: authParser,
		crypto: crypto
	}
}

module.exports = global.helper;
