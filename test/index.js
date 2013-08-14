var Browser = require('zombie')
  , expect = require('expect.js');

describe('Index page', function () {
	before(function (done) {
		this.browser = new Browser();
		this.browser
			.visit('http://localhost:3000/')
			.then(done, done);
	})

	it('should contain anonymous title', function () {
		expect(this.browser.text('title')).to.eql('anonymous');
	})
})