module.exports = function(sequelize, Sequelize) {

	var userRooms = sequelize.define('userRooms', {
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
            notEmpty: true
		},
		name: {
            type: Sequelize.INTEGER
        }
	});

	return userRooms;

}