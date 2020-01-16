module.exports = function(sequelize, Sequelize) {

	var Diaper = sequelize.define('diaper', {
 
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
 
		poop: {
			type: Sequelize.BOOLEAN
		},

		pee: {
			type: Sequelize.BOOLEAN
		},

		time: {
			type: Sequelize.DATE
		},

		addedBy: {
			type: Sequelize.INTEGER
		}
 
	});
 
	return Diaper;
 
}