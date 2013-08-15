if (!global.hasOwnProperty('db')) {
	var Sequelize = require('sequelize')
	  , sequelize = null;

	if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
		// the application is executed on Heroku ... use the postgres database
    	var match = process.env.HEROKU_POSTGRESQL_BRONZE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

    	sequelize = new Sequelize(match[5], match[1], match[2], {
    		dialect: 'postgres',
    		protocol: 'postgres',
    		port: match[4],
    		host: match[3],
    		logging: console.log
    	});
	} else {
		// the application is executed on the local machine
		var dbConfig = require('./../config/db').dev.pg;

		// grab test config if NODE_ENV=test
		if (process.env.NODE_ENV)
			if (process.env.NODE_ENV == 'test')
				dbConfig = require('./../config/db').test.pg;

		sequelize = new Sequelize(dbConfig.db, dbConfig.username, dbConfig.password, {
			dialect: dbConfig.dialect,
			port: dbConfig.port,
			protocol: dbConfig.protocol,
			logging: console.log
		});
	}

	global.db = {
		Sequelize: Sequelize,
		sequelize: sequelize,
		user: sequelize.import(__dirname + '/user')
	}
}

module.exports = global.db;