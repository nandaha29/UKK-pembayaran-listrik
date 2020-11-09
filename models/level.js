'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // menghubungkan level -> admin
      // this.hasOne(models.admin, {
      //   foreignKey: "id_admin", 
      //   as: "admin"  
      // })
      // tidak perlu karena parent -> child dan 1 relasi
    }
  };
  level.init({
    id_level: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'level',
    tableName: 'level' //nama tabel
  });
  return level;
};

