const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const User = sequelize.define("User", {
	id: {
		type: DataTypes.UUID,
		defaultValue: () => uuidv4(),
		primaryKey: true,
	},
	Nama: {
		type: DataTypes.STRING,
		unique: {
			msg: "Nama sudah digunakan. Harap pilih Nama lain.",
		},
		allowNull: false,
		require,
		validate: {
			notNull: {
				msg: "Nama harus diisi.",
			},
		},
	},
	rate: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Rate harus diisi.",
			},
			isInt: {
				msg: "Rate harus berupa angka.",
			},
		},
	},
	total_durasi: {
		type: DataTypes.DECIMAL(8, 2),
		allowNull: true,
	},
	total_pendapatan: {
		type: DataTypes.INTEGER,
		allowNull: true,
		validate: {
			isInt: {
				msg: "Total Pendapatan harus berupa angka.",
			},
		},
	},
});

module.exports = User;
