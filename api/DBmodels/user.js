module.exports = (sequelize, Sequelize) => {

	var User = sequelize.define('user', {

		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		firstName: {
			type: Sequelize.STRING,
			notEmpty: true
		},
		lastName: {
			type: Sequelize.STRING,
			notEmpty: true
		},
		username: {
			type: Sequelize.TEXT
		},
		about: {
			type: Sequelize.TEXT
		},
		email: {
			type: Sequelize.STRING,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		lastLogin: {
			type: Sequelize.DATE
		},
		role: {
			type: Sequelize.INTEGER,
		}
	});

	return User;

}