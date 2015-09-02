'use strict';
var Sequelize = require('sequelize');
module.exports = function(sequelize) {
  var Objective = sequelize.define('Objective', {
    objective: Sequelize.TEXT,
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Objective.hasMany(models.Budget);
        Objective.hasMany(models.ProgressReport);
        Objective.hasMany(models.Activities);
      }
    }
  });
  return Objective;
};