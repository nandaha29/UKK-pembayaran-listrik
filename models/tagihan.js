'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tagihan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      //menghubungkan tagihan -> penggunaan
      this.belongsTo(models.penggunaan, {
        foreignKey: "id_penggunaan",
        key: "penggunaan"
      })

      //menghubungkan tagihan -> pembayaran
      this.hasOne(models.pembayaran, {
        foreignKey: "id_tagihan", //karena mengikuti foregnkey tabel asal
        key: "pembayaran" //alias 
      })
    }
  };
  tagihan.init({
    id_tagihan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }, 
    bulan: DataTypes.STRING,
    tahun: DataTypes.STRING,
    jumlah_meter: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tagihan',
    tableName: 'tagihan'
  });
  return tagihan;
};