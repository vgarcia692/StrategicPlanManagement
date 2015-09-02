'use strict';
module.exports = function(sequelize, DataTypes) {
  var KPIs = sequelize.define('KPIs', {
    keyPerformanceIndicator: DataTypes.TEXT,
    keyTarget: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return KPIs;
};