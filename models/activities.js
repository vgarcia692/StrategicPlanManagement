'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activities = sequelize.define('Activities', {
    responsiblePerson: DataTypes.STRING,
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