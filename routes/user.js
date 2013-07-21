
/*
 * GET users listing.
 */

module.exports = function (app, db, helper) {

	app.get('/user', function (req, res) {
		var password = 'pass@word1';

		helper.hash(password, function (err, salt, hashed_password) {
			db.User
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

	app.get('/user/login', function (req, res) {
		res.render('user/login');
	})
}

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };