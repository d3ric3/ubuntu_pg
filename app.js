
/**
 * Module dependencies.
 */

var express = require('express')
	// , routes = require('./routes')
	// , user = require('./routes/user')
	, http = require('http')
	, path = require('path')
	, db = require('./models')
	, helper = require('./helper');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser('860128145103'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: '860128145103' }));
app.use(helper.authParser);
app.use(helper.views.parser);
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

//routes settings
require('./routes/index')(app, db, helper);
require('./routes/user')(app, db, helper);

//api settings
require('./api/users')(app, db);

db.sequelize.sync().complete(function (err){
	if (err) {
		throw err;
	} else {
		http.createServer(app).listen(app.get('port'), function(){
			console.log('NODE_ENV: ' + process.env.NODE_ENV);
			console.log('Express server listening on port ' + app.get('port'));
		});
	}
});
