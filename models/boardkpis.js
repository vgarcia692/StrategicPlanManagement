'use strict';
module.exports = function(sequelize, DataTypes) {
  var BoardKPIs = sequelize.define('BoardKPIs', {
    kpi: DataTypes.TEXT,
    f15: DataTypes.INTEGER,
    sp16: DataTypes.INTEGER,
    su16: DataTypes.INTEGER,
    f16: DataTypes.INTEGER,
    sp17: DataTypes.INTEGER,
    su17: DataTypes.INTEGER,
    f17: DataTypes.INTEGER,
    sp18: DataTypes.INTEGER,
    su18: DataTypes.INTEGER,
    f18: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BoardKPIs;
};