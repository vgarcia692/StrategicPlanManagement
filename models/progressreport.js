'use strict';
var Sequelize = require('sequelize');
module.exports = function(sequelize) {
  var ProgressReport = sequelize.define('ProgressReport', {
    status: Sequelize.STRING,
    report_narrative: Sequelize.TEXT,
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProgressReport;
};