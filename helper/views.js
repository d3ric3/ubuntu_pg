//setting global variable in views

module.exports = {

	//make http request available in http response
	//req will be available in views
	parser: function (req, res, next) {
		res.locals.req = req;
		next();
	},

	//add alerts variables to current http response
	//same with res.render('path', { alerts: ['message'] })
	addAlert: function (message, res) {
		if (res.locals.alerts)
			res.locals.alerts.push(message);
		else
			res.locals.alerts = [message];
	},

	//remove alerts variables to current http response
	removeAlert: function (message, res) {
		if (res.locals.alerts != null) {
			var index = res.locals.alerts.indexOf(message);
			if (index != -1) {
				res.locals.alerts.splice(index, 1);
			}
		}
	}
}