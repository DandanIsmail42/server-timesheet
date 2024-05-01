const Proyek = require("../models/proyek");

const createProyek = async (req, res) => {
	const { nama_proyek } = req.body;
	try {
		const newProyek = await Proyek.create({ nama_proyek });
		return res.status(201).json({
			status: 201,
			record: newProyek,
		});
	} catch (error) {
		console.log(error);
	}
};

const getProyeks = async (req, res) => {
	try {
		const proyek = await Proyek.findAll();
		return res.status(200).json({
			status: 200,
			record: proyek,
		});
	} catch (error) {
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Implementasi update dan delete jika diperlukan

module.exports = { createProyek, getProyeks };
