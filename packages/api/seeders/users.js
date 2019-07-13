'use strict';
var bcrypt = require('bcrypt');

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Users', [{
			email: 'test1@gmail.com',
			password: bcrypt.hashSync('test', bcrypt.genSaltSync(10)),
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			email: 'test2@gmail.com',
			password: bcrypt.hashSync('test', bcrypt.genSaltSync(10)),
			createdAt: new Date(),
			updatedAt: new Date()
		}], {})
	},
	down: function (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Users', null, {});
	}
};