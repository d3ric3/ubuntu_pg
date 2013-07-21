module.exports = function (sequelize, DataTypes) {


	return sequelize.define("User", {
		username: DataTypes.STRING,
		email: { type: DataTypes.STRING, unique: true },
		password: DataTypes.STRING,
		salt: DataTypes.STRING
	});
}
