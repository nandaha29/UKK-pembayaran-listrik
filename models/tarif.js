'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tarif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //menghubungkan tarif -> pelanggan
      this.hasOne(models.pelanggan, {
        foreignKey: "id_pelanggan",
        key: "pelanggan"
      })
      
    }
  };
  tarif.init({
    id_tarif: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }, 
    daya: DataTypes.STRING,
    tarifperkwh: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'tarif',
    tableName: 'tarif'
  });
  return tarif;
};