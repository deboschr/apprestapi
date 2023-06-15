const express = require("express");
const auth = require("./auth");
const router = express.Router(); // R nya harus gede

//daftarkan menu registrasi
router.post("/api/v1/register", auth.registration);

module.exports = router;

