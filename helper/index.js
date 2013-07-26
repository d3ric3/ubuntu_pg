if (!global.hasOwnProperty('helper')) {
	//init if not exists
	var hash = require('./hash');
	var guid = require('./guid');
	var authParser = require('./auth');

	global.helper = {
		hash: hash,
		guid: guid,
		authParser: authParser
	}
}

module.exports = global.helper;
