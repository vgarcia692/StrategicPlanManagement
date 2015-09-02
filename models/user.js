'use strict';
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize) {
  var User = sequelize.define('User', {
    f_name: Sequelize.STRING,
    l_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    department: Sequelize.STRING,
    access_group: Sequelize.STRING,
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

  User.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
  };

  return User;
};