const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const { v4: uuidv4 } = require("uuid");
const Proyek = require("./proyek");
const Kegiatan = sequelize.define("Kegiatan", {
	id: {
		type: DataTypes.UUID,
		defaultValue: () => uuidv4(),
		primaryKey: true,
	},
	judul_kegiatan: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Judul Kegiatan harus diisi.",
			},
		},
	},
	tanggal_mulai: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Tanggal Mulai harus diisi.",
			},
			isDate: {
				msg: "Tanggal Mulai harus berupa tanggal yang valid.",
			},
		},
	},
	tanggal_berakhir: {
		type: DataTypes.DATE,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Tanggal Mulai harus diisi.",
			},
			isDate: {
				msg: "Tanggal Mulai harus berupa tanggal yang valid.",
			},
		},
	},
	durasi: {
		type: DataTypes.DECIMAL(8, 2),
		allowNull: true,
	},
	// Tambahkan validasi untuk kolom lainnya sesuai kebutuhan
});

// Define associations
Kegiatan.belongsTo(User);
Kegiatan.belongsTo(Proyek);

module.exports = Kegiatan;
