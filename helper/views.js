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
		var resAlerts = res.locals.alerts;
		var m = message;
		//if resAlerts not null
		if (resAlerts)
			resAlerts = (m instanceof Array) ? resAlerts.concat(m) : resAlerts.push(m);
		else
			resAlerts = (m instanceof Array) ? m : [m];
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