var templates = function () {}

templates.prototype.replace = function(objKeyValuePair, template) {
	for (var key in objKeyValuePair) {
		if (objKeyValuePair.hasOwnProperty(key)) {
			var templateKey = '{' + key + '}';

			while(template.indexOf(templateKey) != -1)
				template = template.replace(templateKey, objKeyValuePair[key]);
		}
	}
	return template;
}

//keys: {email}, {verifyEmailUrl}
templates.prototype.VERIFY_EMAIL_CONTENT = 
"<b>Dear valued customer,</b>" +
"<p>Thank you for choosing SMESupply.com, Malaysia SME sourcing site.</p>" +
"<p>With this registration, you are able to get products quote, securing product supply and entitled to receive our newsletters and updates.</p>" +
"<p>Your login details are as follow: </p>" +
"<p><b>Username:</b> {email}</p>" +
"<p>You will need to activate your account before you can log in to SMESupply.com <br/><a href='{verifyEmailUrl}'>Please click here to activate your account</a></p>" +
"<p>If the link above doesn't work, please copy and paste the link below in your browser: <br/> <span style='color:dodgerblue'>{verifyEmailUrl}</span></p>" +
"<p>Please do not hesitate to contact us at <span style='color:dodgerblue'>+6 017 663 1034</span> or email <a href='mailto:smesupply@gmail.com' style='color:dodgerblue'>smesupply@gmail.com</a> should you require any further assistance</p>" +
"<p>Thank you and have a nice day!</p>" +
"<p></p>" +
"<p><b>Best regards,</b>" +
"<b><h3>SMESupply.com Malaysia</h3></b>";

//keys: none
templates.prototype.CONFIRM_EMAIL_MESSAGE = 
"<b>Confirm You Email Address</b><br/><br/>" +
"A confirmation email has been sent to the email address you provided. Click on the confirmation link in the email to active your account.<br/><br/>" +
"If you don't receive the confirmation email within one hour, check your email account's spam folder<br/><br/>";

//keys: none
templates.prototype.SUCCESS_VERIFY_EMAIL = 
"<p>Email address and username verified!</p>" +
"<p>Your account is activated.</p>" +
"<p>You may log in now to gain access to SMESupply.com members only features</p>";

//keys: none
templates.prototype.EMAIL_VERIFIED_WARNING = 
"<p>Email is verified</p>" +
"<p>You may proceed with login to the site</p>";

//keys: none
templates.prototype.INTERNAL_SERVER_ERROR = 
"<h3><b>Something's wrong!</b></h3>" +
"<p>It looks as though we've broken something on our system. Don't panic - I've emailed <a href='mailto:d3ric3@gmail.com'>Derice</a> and told him what's wrong. He'll get to it as soon as he can.</p>" +
"<p>In the meantime, please feel free to have a rant here</p>";

module.exports = new templates();