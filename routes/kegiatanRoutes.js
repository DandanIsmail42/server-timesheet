const express = require("express");
const router = express.Router();
const KegiatanController = require("../controllers/kegiatanController");

router.get("/:userId", KegiatanController.getKegiatanByUserId);
router.post("/", KegiatanController.createKegiatan);
router.put("/:id", KegiatanController.updateKegiatan);
router.delete("/:id", KegiatanController.deleteKegiatan);
// router.get("/:kegiatanId", KegiatanController.getKegiatan);

// router.get('/', KegiatanController.);

// Implementasi update dan delete jika diperlukan

module.exports = router;
