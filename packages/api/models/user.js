"use strict";
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		email: {
			type: DataTypes.STRING,
			unique: true
		},
		password: {
			type: DataTypes.STRING
		}
	}, {
		classMethods: {
			associate: function(models) {
				User.hasMany(models.Destination);
			}
		},
		instanceMethods: {
			checkPassword: function(password) {
				return bcrypt.compare(password, this.password)
			}
		},
		hooks: {

		},
		scopes: {
			authUser: function() {
				return {
				}
			}
		}
	});

	return User;
};