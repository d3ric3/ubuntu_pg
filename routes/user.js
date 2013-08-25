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

		//validation copy from SMESupply.Models.UserRegister
		var alerts = [];
		if (!b.txtEmail) alerts.push('Email can not be empty')
		if (!helper.validate.isEmail(b.txtEmail) && b.txtEmail) alerts.push('Please provide valid email')
		if (!b.txtPassword) alerts.push('Password can not be empty')
		if (!b.txtConfirmPassword) alerts.push('Confirm password can not be empty')
		if (b.txtPassword !== b.txtConfirmPassword) alerts.push('Password and confirm password must be same')

		if(alerts.length > 0)
			res.render('user/register', { alerts: alerts })
		else
			res.render('user/register')
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

	app.get('/user/logout', function (req, res) {
		//logout logic handled through /helper/auth.js
		//req.session.uat and req.cookies.uat is reset
		//continue with business logic
		res.redirect('/');
	});
}