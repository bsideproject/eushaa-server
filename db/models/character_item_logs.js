'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class characterItemLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        this.belongsTo(models.CharacterItems, { foreignKey: 'character_item_id', sourceKey: 'id' });
    }
  };
  characterItemLogs.init({
    is_active: { type: DataTypes.ENUM('Y', 'N'), defaultValue: 'N' },
  }, {
    timestamps: true,
    sequelize,
    modelName: 'character_item_logs',
  });

  return characterItemLogs;
};