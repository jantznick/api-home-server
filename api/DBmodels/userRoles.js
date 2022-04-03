module.exports = (sequelize, Sequelize) => {

	var userRoles = sequelize.define('userRoles', {
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			notEmpty: true
		},
		name: {
			type: Sequelize.STRING
		}
	});

	return userRoles;

}