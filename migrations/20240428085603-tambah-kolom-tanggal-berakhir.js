"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Kegiatans", "tanggal_berakhir", {
			type: Sequelize.DATE,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Tanggal Berakhir harus diisi.",
				},
				isDate: {
					msg: "Tanggal Berakhir harus berupa tanggal yang valid.",
				},
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Kegiatans", "tanggal_berakhir");
	},
};
