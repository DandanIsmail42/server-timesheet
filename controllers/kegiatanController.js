const Kegiatan = require("../models/kegiatan");
const Proyek = require("../models/proyek"); // Import model Proyek
const User = require("../models/user"); // Import model User
const { createUser, updateTotalDurasi } = require("./userController");
const createKegiatan = async (req, res) => {
	try {
		const {
			judul_kegiatan,
			tanggal_mulai,
			tanggal_berakhir,
			waktu_mulai,
			waktu_berakhir,
		} = req.body;

		const durasiMilliseconds =
			new Date(tanggal_berakhir) - new Date(tanggal_mulai);
		const durasiJam = durasiMilliseconds / (1000 * 60 * 60);

		const durasiJamInt = Math.floor(durasiJam);

		const durasiMenit = Math.round((durasiJam - durasiJamInt) * 60);

		const userId = req.body.UserId;
		const proyekId = req.body.ProyekId;

		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const proyek = await Proyek.findByPk(proyekId);
		if (!proyek) {
			return res.status(404).json({ error: "Proyek not found" });
		}

		const newKegiatan = await Kegiatan.create({
			judul_kegiatan,
			tanggal_mulai,
			tanggal_berakhir,
			waktu_mulai,
			waktu_berakhir,
			durasi: durasiJam,
			UserId: userId,
			ProyekId: proyekId,
		});

		console.log(newKegiatan);
		await updateTotalDurasi(userId);
		return res.status(201).json({
			status: 201,
			message: "Kegiatan berhasil ditambahkan",
			id: newKegiatan.id,
			judul_kegiatan: newKegiatan.judul_kegiatan,
			tanggal_mulai: newKegiatan.tanggal_mulai,
			tanggal_berakhir: newKegiatan.tanggal_berakhir,
			waktu_mulai: newKegiatan.waktu_mulai,
			waktu_berakhir: newKegiatan.waktu_berakhir,
			durasi: `${durasiJamInt} jam ${durasiMenit} menit`,
			user: {
				id: user.id,
				nama: user.Nama,
			},
			proyek: {
				id: proyek.id,
				nama: proyek.nama_proyek,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const getKegiatanByUserId = async (req, res) => {
	try {
		const { userId } = req.params;
		const { proyekId } = req.query;

		let filterOptions = { UserId: userId };
		if (proyekId) {
			filterOptions.ProyekId = proyekId;
		}

		const kegiatans = await Kegiatan.findAll({
			where: filterOptions,
			include: [
				{
					model: User,
					attributes: ["id", "Nama"],
				},
				{
					model: Proyek,
					attributes: ["id", "nama_proyek"],
				},
			],
		});

		if (!kegiatans || kegiatans.length === 0) {
			return res
				.status(400)
				.json({ status: 400, message: "Tidak ada kegiatan" });
		}
		const activity = kegiatans.map((kegiatan) => ({
			id: kegiatan.id,
			judul_kegiatan: kegiatan.judul_kegiatan,
			tanggal_mulai: kegiatan.tanggal_mulai,
			tanggal_berakhir: kegiatan.tanggal_berakhir,
			waktu_mulai: kegiatan.waktu_mulai,
			waktu_berakhir: kegiatan.waktu_berakhir,
			durasi: kegiatan.durasi,
			user: {
				id: kegiatan.User.id,
				nama: kegiatan.User.Nama,
			},
			proyek: {
				id: kegiatan.Proyek.id,
				nama: kegiatan.Proyek.nama_proyek,
			},
		}));
		return res.status(200).json({
			status: 200,
			record: activity,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// const getKegiatanByUserId = async (req, res) => {
// 	try {
// 		// Assuming userId is passed as a parameter in the request
// 		const { userId } = req.params;

// 		// Find all kegiatan associated with the specified user ID and include associated user and proyek
// 		const kegiatans = await Kegiatan.findAll({
// 			where: { UserId: userId },
// 			include: [
// 				{
// 					model: User,
// 					attributes: ["id", "Nama"],
// 				},
// 				{
// 					model: Proyek,
// 					attributes: ["id", "nama_proyek"],
// 				},
// 			],
// 		});

// 		// Check if any kegiatan exists for the specified user ID
// 		if (!kegiatans || kegiatans.length === 0) {
// 			return res
// 				.status(404)
// 				.json({ error: "Kegiatan not found for this user" });
// 		}

// 		// Respond with the kegiatans details along with user and proyek info
// 		return res.json(
// 			kegiatans.map((kegiatan) => ({
// 				id: kegiatan.id,
// 				judul_kegiatan: kegiatan.judul_kegiatan,
// 				tanggal_mulai: kegiatan.tanggal_mulai,
// 				tanggal_berakhir: kegiatan.tanggal_berakhir,
// 				waktu_mulai: kegiatan.waktu_mulai,
// 				waktu_berakhir: kegiatan.waktu_berakhir,
// 				durasi: kegiatan.durasi,
// 				user: {
// 					id: kegiatan.User.id,
// 					nama: kegiatan.User.Nama,
// 				},
// 				proyek: {
// 					id: kegiatan.Proyek.id,
// 					nama: kegiatan.Proyek.nama_proyek,
// 				},
// 			}))
// 		);
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(500).json({ error: "Internal Server Error" });
// 	}
// };

const updateKegiatan = async (req, res) => {
	try {
		const { id } = req.params; // Assuming the kegiatan ID is passed as a parameter
		const {
			judul_kegiatan,
			tanggal_mulai,
			tanggal_berakhir,
			waktu_mulai,
			waktu_berakhir,
			durasi,
			UserId,
			ProyekId,
		} = req.body;

		const durasiMilliseconds =
			new Date(tanggal_berakhir) - new Date(tanggal_mulai);
		const durasiJam = durasiMilliseconds / (1000 * 60 * 60); // Durasi dalam jam

		// Hitung durasiJamInt sebagai bagian integer jam
		const durasiJamInt = Math.floor(durasiJam);

		// Hitung durasiMenit sebagai bagian menit (sisa dari pembagian)
		const durasiMenit = Math.round((durasiJam - durasiJamInt) * 60);

		// Check if the kegiatan ID is valid
		const existingKegiatan = await Kegiatan.findByPk(id);
		if (!existingKegiatan) {
			return res.status(404).json({ error: "Kegiatan not found" });
		}

		// Update the kegiatan with the new values
		await existingKegiatan.update({
			judul_kegiatan,
			tanggal_mulai,
			tanggal_berakhir,
			waktu_mulai,
			waktu_berakhir,
			durasi: durasiJam,
			UserId,
			ProyekId,
		});

		// Calculate the updated duration in hours and minutes
		const updatedDurasi = `${durasiJamInt} jam ${durasiMenit} menit`;
		await updateTotalDurasi(UserId);
		// Respond with the updated kegiatan details
		return res.json({
			message: "Kegiatan updated successfully",
			id: existingKegiatan.id,
			judul_kegiatan: existingKegiatan.judul_kegiatan,
			tanggal_mulai: existingKegiatan.tanggal_mulai,
			tanggal_berakhir: existingKegiatan.tanggal_berakhir,
			waktu_mulai: existingKegiatan.waktu_mulai,
			waktu_berakhir: existingKegiatan.waktu_berakhir,
			durasi: updatedDurasi,
			UserId: existingKegiatan.UserId,
			ProyekId: existingKegiatan.ProyekId,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

const deleteKegiatan = async (req, res) => {
	try {
		const { id } = req.params; // Assuming the kegiatan ID is passed as a parameter

		// Check if the kegiatan ID is valid
		const existingKegiatan = await Kegiatan.findByPk(id);
		if (!existingKegiatan) {
			return res.status(404).json({ error: "Kegiatan not found" });
		}

		console.log("ex", existingKegiatan);
		// Delete the kegiatan
		await existingKegiatan.destroy();
		await updateTotalDurasi(existingKegiatan.UserId);
		// Respond with success message
		return res.json({ message: "Kegiatan deleted successfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	createKegiatan,
	getKegiatanByUserId,
	updateKegiatan,
	deleteKegiatan,
};
