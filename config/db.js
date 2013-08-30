module.exports = {

	dev: {
		pg: {
			dialect: 'postgres',
			username: 'postgres',
			password: 'postgres',
			port: 5432,
			protocol: 'tcp',
			db: 'ubuntu_pg'
		}
	},

	test: {
		pg: {
			dialect: 'postgres',
			username: 'postgres',
			password: 'postgres',
			port: 5432,
			protocol: 'tcp',
			db: 'ubuntu_pg_test'
		}
	}
	
}