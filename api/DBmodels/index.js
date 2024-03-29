var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'home.db'
});
var db = {};

fs
	.readdirSync(__dirname)
	.filter((file) => {
		return (file.indexOf(".") !== 0) && (file !== "index.js");
	})
	.forEach((file) => {
		var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if ("associate" in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;