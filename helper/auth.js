/*
	place authParser() middleware after express.cookieParser() and express.session()

	after successful login, req.session.uat will contains { username: value, accessToken: value }
*/

var config = require('./../config/auth')
	, hash = require('./hash')
	, guid = require('./guid')
	, crypto = require('./crypto')
	, views = require('./views')
	, validate = require('./validate')
	, db = require('./../models');

var authParser = function (req, res, next) {
	//remember me: restore session from cookie
	restoreUserSessionFromCookie(req, res);

	//login request
	if(req.method == 'POST' && req.url == config.login.url)			
		login(req, res, next);

	//logout request
	else if(req.url == config.logout.url)
		logout(req, res, next);

	//continue with next middleware
	else next();
}

var login = function (req, res, next) {
	var username = req.body[config.login.view.username];
	var password = req.body[config.login.view.password];
	var rememberMe = (req.body[config.login.view.rememberMe] == 'on') ? true : false;

	//validation copy from SMESupply.Models.User
	var alerts = [];
	if (!username) alerts.push('Email can not be empty');
	if (!validate.isEmail(b.txtEmail) && username) alerts.push('Please provide valid email');
	if (!password) alerts.push('Password can not be empty');
	
	// add error message to res.locals.alerts
	if (alerts.length > 0)
		views.addAlert(alerts);
	else {
		//look for user in db
		db.user.find({
			where: { email: username }
		}).error(function (err) { 
			return next(err);
		}).success(function (user) {
			var u = user;

			if(u == null) {
				views.addAlert('Email does not exist in our system', res);
				return next();
			}

			if (u.isActive == false) {
				views.addAlert('Email not verify, please check your mailbox/spam folder for verification steps');
				return next();
			}

			//hash input password with user's password salt
			hash(password, u.salt, function (err, hashed_pass) {
				if (err)
					return next(err);
				else {
					if(hashed_pass == u.password)
						startUserSession(u, rememberMe, req, res, next);
					else {
						views.addAlert('Invalid password');
						return next();
					}
				}
			});
		});
	}
}

var startUserSession = function (user, rememberMe, req, res, next) {
	user.accessToken = guid();
	user.save();

	//uat=user access token
	var uat = {
		accessToken: user.accessToken, 
		username: user.username
	}
	
	req.session.uat = uat;

	//set uat into cookie
	if(rememberMe) {
		//encrypt uat object in json format
		crypto.encrypt(JSON.stringify(uat), function (encrypted_text) {
			res.cookie('uat', encrypted_text, { 
				maxAge: 365 * 24 * 60 * 60 * 1000, 
				httpOnly: true, 
				signed: true 
			}); // expires = 265 days, created signed cookie
		});		
	}		

	next();
}

var restoreUserSessionFromCookie = function (req, res) {
	if(req.signedCookies.uat != null && req.session.uat == null) {
		//decrypt uat object in json format
		crypto.decrypt(req.signedCookies.uat, function (decrypted_text) {
			req.session.uat = JSON.parse(decrypted_text);
		});
	}
}

var logout = function (req, res, next) {
	req.session.destroy(function(){});
	res.clearCookie('uat');

	next();
}

module.exports = authParser;
