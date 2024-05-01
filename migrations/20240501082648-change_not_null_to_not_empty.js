"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn("Proyeks", "nama_proyek", {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn("Proyeks", "nama_proyek", {
			type: Sequelize.STRING,
			allowNull: false,
		});
	},
};
