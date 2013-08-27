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
templates.prototype.VERIFY_EMAIL = 
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

module.exports = new templates();