module.exports = function(sequelize, Sequelize) {

	var Feeding = sequelize.define('feeding', {

		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		breast: {
			type: Sequelize.ENUM('left', 'right')
		},

		startTime: {
			type: Sequelize.DATE
		},

		finishTime: {
			type: Sequelize.DATE
		},

		amount: {
			type: Sequelize.INTEGER
		},

		addedBy: {
			type: Sequelize.INTEGER
		}

	});

	return Feeding;

}