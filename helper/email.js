var nodemailer = require('nodemailer');

var email = function () {}

email.prototype.send = function (emailOptions) {
	this.gmailSend({
		user: 'smesupply@gmail.com',
		pass: 'smesupplybadguy'
	}, emailOptions);
}

email.prototype.gmailSend = function (credential, emailOptions) {
	var smtpTransport = nodemailer.createTransport('SMTP', {
		service: 'Gmail',
		auth: {
			user: credential.user,
			pass: credential.pass
		}
	});

	var mailOptions = {
		from: emailOptions.from,
		to: emailOptions.to,
		subject: emailOptions.subject,
		text: emailOptions.text,
		html: emailOptions.html
	}

	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log('Message sent: ' + response.message);
		}

		smtpTransport.close();
	});
}

module.exports = new email();