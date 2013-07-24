if (!global.hasOwnProperty('helper')) {
	//init if not exists
	var hash = require('./hash');
        var guid = require('./guid');
	global.helper = {
		hash: hash,
	        guid: guid
	}
}

module.exports = global.helper;
