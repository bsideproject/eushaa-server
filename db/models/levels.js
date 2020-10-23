'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class levels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
			this.hasMany(models.SpaceItems, { foreignKey: 'level_id', sourceKey: 'id' });
    }
  };
  levels.init({
    level: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    bg_img: DataTypes.STRING(255),
  }, {
    timestamps: false,
    sequelize,
    modelName: 'levels',
  });

  return levels;
};