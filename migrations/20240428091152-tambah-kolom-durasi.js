"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Kegiatans", "durasi", {
			type: Sequelize.INTEGER,
			allowNull: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Kegiatans", "durasi");
	},
};
