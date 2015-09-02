'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activities = sequelize.define('Activities', {
    activity: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Activities;
};