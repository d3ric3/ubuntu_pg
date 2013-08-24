if (!global.hasOwnProperty('helper')) {
	//init if not exists
	var hash = require('./hash');
	var guid = require('./guid');
	var authParser = require('./auth');
	var crypto = require('./crypto');
	var views = require('./views');
	var validate = require('./validate');

	global.helper = {
		hash: hash,
		guid: guid,
		authParser: authParser,
		crypto: crypto,
		views: views,
		validate: validate
	}
}

module.exports = global.helper;
