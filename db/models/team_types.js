'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teamTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  teamTypes.init({
	type: { type: DataTypes.STRING(63), allowNull: false,unique:true}
  }, {
    timestamps: false,
    sequelize,
    modelName: 'team_types',
  });

  return teamTypes;
};