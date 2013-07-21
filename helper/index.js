if (!global.hasOwnProperty('helper')) {
	//init if not exists
	var hash = require('./hash');

	global.helper = {
		hash: hash
	}
}

module.exports = global.helper;