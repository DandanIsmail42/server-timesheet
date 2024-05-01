const User = require("../models/user");
const Kegiatan = require("../models/kegiatan");
const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const getAllUser = async (req, res) => {
	try {
		const user = await User.findAll();

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		return res.status(200).json({
			status: 200,
			record: user,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
const getUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		return res.status(200).json({
			status: 200,
			record: user,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { Nama, rate } = req.body;

		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		await user.update({ Nama, rate });

		return res.status(200).json({
			message: "User updated successfully",
			status: 200,
			id: user.id,
			Nama: user.Nama,
			rate: user.rate,
		});
	} catch (error) {
		return res.status(400).json({
			status: 400,
			error: error.message,
		});
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		await user.destroy();

		return res.json({ message: "User deleted successfully" });
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			status: 400,
			error: error.message,
		});
	}
};
const createUser = async (req, res) => {
	try {
		const { Nama, rate, total_durasi, total_pendapatan } = req.body;
		const newUser = await User.create({
			Nama,
			rate,
			total_durasi,
			total_pendapatan,
		});
		return res.status(201).json({
			message: "Data berhasil ditambahkan",
			status: 201,
			record: newUser,
		});
	} catch (error) {
		return res.status(400).json({
			status: 400,
			error: error.message,
		});
	}
};

const updateTotalDurasi = async (userId) => {
	try {
		// Hitung total_durasi dari kegiatan yang terkait dengan ID User
		const totalDurasiResult = await Kegiatan.findOne({
			attributes: [
				[sequelize.fn("sum", sequelize.col("durasi")), "total_durasi"],
			],
			where: {
				UserId: userId,
			},
		});

		// Ambil total_durasi dari hasil perhitungan
		const totalDurasiHours = totalDurasiResult.dataValues.total_durasi || 0;
		const totalDurasiMinutes = Math.round(
			(totalDurasiHours - Math.floor(totalDurasiHours)) * 60
		);

		// Hitung total_pendapatan berdasarkan rate dan total_durasi
		const user = await User.findByPk(userId);
		if (!user) {
			throw new Error("User not found");
		}
		const totalPendapatan = user.rate * totalDurasiHours;

		// Update total_durasi dan total_pendapatan pada User
		await User.update(
			{
				total_durasi: totalDurasiHours,
				total_pendapatan: totalPendapatan,
			},
			{ where: { id: userId } }
		);

		return totalDurasiHours; // Kembalikan total durasi yang dihitung
	} catch (error) {
		console.log(error);
		throw new Error("Failed to update total_durasi and total_pendapatan");
	}
};

// const updateTotalDurasi = async (userId) => {
// 	try {
// 		// Hitung total_durasi dari kegiatan yang terkait dengan ID User
// 		const totalDurasiResult = await Kegiatan.findOne({
// 			attributes: [
// 				[sequelize.fn("sum", sequelize.col("durasi")), "total_durasi"],
// 			],
// 			where: {
// 				UserId: userId,
// 			},
// 		});

// 		// Ambil total_durasi dari hasil perhitungan
// 		const totalDurasi = totalDurasiResult.dataValues.total_durasi || 0;

// 		// Hitung total_pendapatan berdasarkan rate dan total_durasi
// 		const user = await User.findByPk(userId);
// 		if (!user) {
// 			throw new Error("User not found");
// 		}
// 		const totalPendapatan = user.rate * totalDurasi;

// 		// Update total_durasi dan total_pendapatan pada User
// 		await User.update(
// 			{ total_durasi: totalDurasi, total_pendapatan: totalPendapatan },
// 			{ where: { id: userId } }
// 		);

// 		return totalDurasi; // Kembalikan total durasi yang dihitung
// 	} catch (error) {
// 		console.log(error);
// 		throw new Error("Failed to update total_durasi and total_pendapatan");
// 	}
// };

module.exports = {
	getAllUser,
	getUserById,
	updateUser,
	deleteUser,
	createUser,
	updateTotalDurasi,
};
