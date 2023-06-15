const express = require("express");
const auth = require("./auth");
const router = express.Router(); // R nya harus huruf besar
const verification = require("./verification");

//daftarkan url registrasi
router.post("/api/v1/register", auth.registration);
//daftarkan url login
router.post("/api/v1/login", auth.login);
//alamat yang perlu di otorisasi
router.get("/api/v1/homesiswa", verification(), auth.halamanSiswa);

module.exports = router;
