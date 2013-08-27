if (!global.hasOwnProperty('helper')) {
	//init if not exists
	var hash = require('./hash');
	var guid = require('./guid');
	var authParser = require('./auth');
	var crypto = require('./crypto');
	var views = require('./views');
	var validate = require('./validate');
	var email = require('./email');
	var templates = require('./templates');

	global.helper = {
		hash: hash,
		guid: guid,
		authParser: authParser,
		crypto: crypto,
		views: views,
		validate: validate,
		email: email,
		templates: templates
	}
}

module.exports = global.helper;
