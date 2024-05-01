const express = require("express");
const router = express.Router();
const ProyekController = require("../controllers/proyekController");

router.post("/", ProyekController.createProyek);
router.get("/", ProyekController.getProyeks);

// Implementasi update dan delete jika diperlukan

module.exports = router;
