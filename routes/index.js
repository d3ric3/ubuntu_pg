
/*
 * GET home page.
 */

 module.exports = function (app, db, helper) {

 	app.get('/', function (req, res) {
 		res.render('index', { title: helper.guid() } );
 	});
 }

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };