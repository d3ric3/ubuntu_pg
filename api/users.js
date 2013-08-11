module.exports = function (app, db) {

	app.get('/api/users/:email', function (req, res) {
		db.user
			.find({
				where: { email: req.params.email }
			})
			.error(function(err) {
				res.status(404).send('404 Not found')
			})
			.success(function(user) {
				if (!user)
					res.json({ exist: false })
				else
					res.json({ exist: true })
			})
	})
}