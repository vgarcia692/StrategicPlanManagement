'use strict';
var Sequelize = require('sequelize');
module.exports = function(sequelize) {
  var Budget = sequelize.define('Budget', {
    line_item: Sequelize.STRING,
    source: Sequelize.STRING,
    amount: Sequelize.INTEGER,
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Budget;
};