'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class characterItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.CharacterItemLogs, { foreignKey: 'character_item_id', sourceKey: 'id' });
    }
  };
  characterItems.init({
    pos_x: DataTypes.FLOAT,
    pos_y: DataTypes.FLOAT,
    image: DataTypes.STRING(255)
  }, {
    timestamps: false,
    sequelize,
    modelName: 'character_items',
  });

  return characterItems;
};