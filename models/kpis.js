'use strict';
module.exports = function(sequelize, DataTypes) {
  var KPIs = sequelize.define('KPIs', {
    keyPerformanceIndicator: DataTypes.TEXT,
    keyTarget: DataTypes.TEXT,
    base: DataTypes.FLOAT,
    current: DataTypes.FLOAT,
    target2016: DataTypes.FLOAT,
    target2017: DataTypes.FLOAT,
    target2018: DataTypes.FLOAT   
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return KPIs;
};