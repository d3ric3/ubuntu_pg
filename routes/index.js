 module.exports = function (app, db, helper) {

 	app.get('/', function (req, res) {
 		
 		req.session.sid = 'hello session';
 		res.cookie('name', 'hello cookies', { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, signed: true });
 		res.render('index', { title: helper.guid() } );
 	});

 	app.get('/check', function (req, res) {
 		console.log(req.cookies.name);// = 'hello';
 		console.log(req.signedCookies.name);
 		console.log(req.session.sid);// = 'hello';
 		res.render('index', { title: helper.guid() } );
 	});

 	app.get('/remove', function (req, res) {
 		res.clearCookie('name');
 		req.session.destroy(function(){});
 		res.render('index', { title: helper.guid() } );
 	})
 }