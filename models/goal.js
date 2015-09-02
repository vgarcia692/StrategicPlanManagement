'use strict';
var Sequelize = require('sequelize');
module.exports = function(sequelize) {
  var Goal = sequelize.define('Goal', {
    title: Sequelize.TEXT,
    description: Sequelize.TEXT,
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Goal.hasMany(models.Objective);
        Goal.hasMany(models.KPIs);
      }
    }
  });
  return Goal;
};