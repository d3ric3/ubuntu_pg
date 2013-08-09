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
		if(b.txtPassword != b.txtConfirmPassword)
			res.render('user/register', { alerts: ['Plase make sure password and confirm password are the same'] })
	})

	app.get('/user/login', function (req, res) {
		res.render('user/login');
	});
	app.post('/user/login', function (req, res) {
		//login handled through /helper/auth.js
		//req.session.uat contains username and accessToken
		//continue with business logic
		res.redirect('/');
	});

	app.get('/user/logout', function (req, res) {
		//logout handled through /helper/auth.js
		//req.session.uat and req.cookies.uat is reset
		//continue with business logic
		res.redirect('/');
	});
}