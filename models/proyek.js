const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Proyek = sequelize.define("Proyek", {
	id: {
		type: DataTypes.UUID,
		defaultValue: () => uuidv4(),
		primaryKey: true,
	},
	nama_proyek: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "Nama Proyek harus diisi.",
			},
		},
	},
});

module.exports = Proyek;
