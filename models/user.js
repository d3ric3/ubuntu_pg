module.exports = function (sequelize, DataTypes) {


	return sequelize.define("user", {
		username: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, unique: true, allowNull: false },
		password: { type: DataTypes.STRING, allowNull: false },
		salt: DataTypes.STRING,
		accessToken: { type: DataTypes.STRING, unique: true },
		isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		verifyToken: { type: DataTypes.STRING }
	});
}
