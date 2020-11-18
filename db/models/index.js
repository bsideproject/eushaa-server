'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.js')[env];
const db = {};

const makeModelName = (modelName) => {
	const s = modelName.replace(/_[a-z]/g, (match) => match[1].toUpperCase());
	return s[0].toUpperCase() + s.slice(1);
};
let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[makeModelName(model.name)] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.User.hasMany(db.TodoList, { foreignKey: 'user_id', sourceKey: 'id' });
db.User.belongsTo(db.Teams, { foreignKey: 'team_id', targetKey: 'id' });
db.User.hasMany(db.SpaceItemLog, { foreignKey: 'user_id', sourceKey: 'id' });
db.User.belongsTo(db.UserTypes, {  foreignKey: 'user_type_id', sourceKey: 'id' });
db.User.belongsTo(db.Characters, {  foreignKey: 'character_id', sourceKey: 'id' });
db.User.hasMany(db.CharacterLogs, { foreignKey: 'user_id', sourceKey: 'id' });
db.User.hasMany(db.CharacterItemLogs, { foreignKey: 'user_id', sourceKey: 'id' });

// db.User = require('./user')(sequelize, Sequelize);
// db.Todos = require('./todos')(sequelize, Sequelize);
// db.Items = require('./items')(sequelize, Sequelize);
// db.SpaceItemLog = require('./space_item_log')(sequelize, Sequelize);
// db.SpaceItems = require('./space_items')(sequelize, Sequelize);

// db.Levels = require('./levels')(sequelize, Sequelize);

// db.spaceItemLogs = require('./space_item_log')(sequelize, Sequelize);

//db.Todos.hasMany(db.Items, { foreignKey: 'todo_id', sourceKey: 'id' });
//db.Items.belongsTo(db.Todos, { foreignKey: 'todo_id', targetKey: 'id' });



module.exports = db;
