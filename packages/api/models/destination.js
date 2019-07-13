"use strict";
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	var Destination = sequelize.define("Destination", {
		country: {
			type: DataTypes.STRING
    },
    city: {
			type: DataTypes.STRING
    },
    address: {
			type: DataTypes.STRING
    },
    start: {
			type: DataTypes.STRING
    },
    end: {
			type: DataTypes.STRING
    },
    numberOfTravellers: {
      type: DataTypes.STRING
    },
    ticketNumber: {
      type: DataTypes.STRING
    },
    spendingLimit: {
      type: DataTypes.STRING
    },
    notes: {
      type: DataTypes.STRING
    }
	}, {
		classMethods: {
			associate: function(models) {
        Destination.belongsTo(models.User);
			}
		},
		instanceMethods: {
		},
		hooks: {

		},
		scopes: {
			forAuthUser: function(user_id) {
				return {
          include: [{
						model: sequelize.models.User,
						where: {
							id: user_id
						}
					}]
				}
			}
		}
	});

	return Destination;
};