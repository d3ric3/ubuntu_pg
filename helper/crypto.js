var crypto = require('crypto');

module.exports = {

	algorithm: 'aes256',

	key: '666BBFF4-63F8-4EC5-B05C-C94C3572FBA4',

	encrypt: function (text, fn) {
		var cipher = crypto.createCipher(this.algorithm, this.key);
		fn(cipher.update(text, 'utf8', 'hex') + cipher.final('hex'));
	},

	decrypt: function (text, fn) {
		var decipher = crypto.createDecipher(this.algorithm, this.key);
		fn(decipher.update(text, 'hex', 'utf8') + decipher.final('utf8'));
	}

}