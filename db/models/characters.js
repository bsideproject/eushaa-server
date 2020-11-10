'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class characters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  characters.init({
	image: { type: DataTypes.STRING(255), allowNull: false}
  }, {
    timestamps: false,
    sequelize,
    modelName: 'characters',
  });

  return characters;
};