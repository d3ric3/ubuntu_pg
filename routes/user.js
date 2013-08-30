var async = require('async')
,	util = require('util');
// TO-DO: 1. email cleanup on unverify email, 2. Complete 500 error page with a form 3. captcha 4. password reset logic
module.exports = function (app, db, helper) {

	app.get('/crete', function (req, res) {
		var password = 'pass@word1';

		helper.hash(password, function (err, salt, hashed_password) {
			db.user
				.create({
					username: 'd3ric3',
					email: 'd3ric3@gmail.com',
					password: hashed_password,
					salt: salt
				})
				.success(function (user) {
					if (user != null) {
						res.json(user);
					} else {
						res.send('failed to create user');
					}
				})
				.error(function (err) {
					res.json(err);
				});
		});
	});

	app.get('/user/register', function (req, res) {
		res.render('user/register');
	});
	app.post('/user/register', function (req, res) {
		var b = req.body;

		// validation copy from SMESupply.Models.UserRegister
		var alerts = [];
		if (!b.txtEmail) alerts.push('Email can not be empty')
		if (!helper.validate.isEmail(b.txtEmail) && b.txtEmail) alerts.push('Please provide valid email')
		if (!b.txtPassword) alerts.push('Password can not be empty')
		if (!b.txtConfirmPassword) alerts.push('Confirm password can not be empty')
		if (b.txtPassword !== b.txtConfirmPassword) alerts.push('Password and confirm password must be same')

		// display error message to user
		if(alerts.length > 0)
			res.render('user/register', { alerts: alerts })
		else {
			async.waterfall(
				[
					// hash user provided password
					function (callback) {
						helper.hash(b.txtPassword, function (err, salt, hashed_password) {
							if (err) {
								callback(err);
							} else {
								callback(null, salt, hashed_password);	
							}
						});
					},
					// store user data into db
					function (salt, hashed_password, callback) {
						db.user.create({
							username: b.txtEmail,
							email: b.txtEmail,
							password: hashed_password,
							salt: salt,
							isActive: false,
							verifyToken: helper.guid()
						}).success(function (user) {
							if (user != null) {
								callback(null, user);
							} else {
								callback(new Error('failed to create user'));
							}
						}).error(function (err) {
							callback(err);
						});
					},
					// send verify email
					function (user, callback) {
						console.log('here');
						console.log(typeof(user) + ' ' + typeof(callback));
						helper.email.send({
							form: 'smesupply@gmail.com',
							to: b.txtEmail,
							subject: 'SMESupply.com - Welcome to your new account signup',
							html: helper.templates.replace({
								email: b.txtEmail,
								verifyEmailUrl: util.format('http://www.smesupply.com/user/verify/%s/%s', user.email, user.verifyToken)
							}, helper.templates.VERIFY_EMAIL_CONTENT)
						});
						callback(null);
					}
				],
				// final touch
				function (err, result) {
					if (err != null) {
						res.status(500).render('error', { message: helper.templates.INTERNAL_SERVER_ERROR });
					} else {
						res.render('success', { message: helper.templates.CONFIRM_EMAIL_MESSAGE });
					}
			});
		}
	});

	app.get('/user/verify/:email/:verificationToken', function (req, res) {
		var email = req.params.email;
		var vToken = req.params.verificationToken;

		// find user by email
		db.user.find({
			where: { email: email },
			attributes: [ 'id', 'verifyToken', 'isActive' ]
		}).success(function (user) {
			if (user.verifyToken == vToken) {
				user.isActive = true;
				user.verifyToken = null;
				user.save();
				res.render('success', { message: helper.templates.SUCCESS_VERIFY_EMAIL });
			} else if (user.isActive) {
				res.render('warning', { message: helper.templates.EMAIL_VERIFIED_WARNING });
			}
			else
				res.status(500).render('error', { message: helper.templates.INTERNAL_SERVER_ERROR });
		}).error(function (err) {
			res.status(500).render('error', { message: helper.templates.INTERNAL_SERVER_ERROR });
		});
	});

	app.get('/user/login', function (req, res) {
		res.render('user/login')
	});
	app.post('/user/login', function (req, res) {
		//login logic handled through /helper/auth.js
		//req.session.uat contains username and accessToken
		//continue with business logic

		//alert(s) generated from /helper/auth.js
		if (res.locals.alerts)
			res.render('user/login');
		else
			res.redirect('/');
	});

	app.get('/user/reset', function (req, res) {
		res.render('user/reset');
	});
	app.post('/user/reset', function (req, res) {
		res.render('user/reset');
	});

	app.get('/user/logout', function (req, res) {
		//logout logic handled through /helper/auth.js
		//req.session.uat and req.cookies.uat is reset
		//continue with business logic
		res.redirect('/');
	});
}