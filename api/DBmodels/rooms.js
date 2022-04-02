module.exports = (sequelize, Sequelize) => {

	var rooms = sequelize.define('rooms', {
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
            notEmpty: true
		},
		name: {
            type: Sequelize.STRING
        }
	});

	return rooms;

}