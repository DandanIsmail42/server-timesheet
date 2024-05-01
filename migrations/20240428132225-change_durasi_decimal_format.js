"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn("Kegiatans", "durasi", {
			type: Sequelize.DECIMAL(8, 2),
			allowNull: true, // Sesuaikan dengan kebutuhan
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
