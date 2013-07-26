/*
	place authParser() middleware after express.cookieParser() and express.session()

	after successful login, req.session.uat will contains { username: value, accessToken: value }
*/

var config = require('./../config/auth')
	, hash = require('./hash')
	, guid = require('./guid')
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
	
	//look for user in db
	db.user.find({
		where: { email: username }
	})
	.error(function (err) { 
		return next(err);
	})
	.success(function (user) {
		var u = user;

		if(u == null)
			return next(new Error('Invalid email'));

		//hash input password with user's password salt
		hash(password, u.salt, function (err, hashed_pass) {
			if (err) 
				return next(err);
			else {
				if(hashed_pass == u.password)
					startUserSession(u, rememberMe, req, res, next);
				else
					return next(new Error('Invalid password'));
			}
		});
	});
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

	if(rememberMe)
		res.cookie('uat', uat, { 
			maxAge: 365 * 24 * 60 * 60 * 1000, 
			httpOnly: true, 
			signed: true 
		}); // expires = 265 days, created signed cookie

	next();
}

var restoreUserSessionFromCookie = function (req, res) {
	if(req.signedCookies.uat != null && req.session.uat == null) {
		req.session.uat = req.signedCookies.uat;
	}
}

var logout = function (req, res, next) {
	req.session.destroy(function(){});
	res.clearCookie('uat');

	next();
}

module.exports = authParser;
