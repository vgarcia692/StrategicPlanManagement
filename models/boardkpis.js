'use strict';
module.exports = function(sequelize, DataTypes) {
  var BoardKPIs = sequelize.define('BoardKPIs', {
    kpi: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BoardKPIs;
};