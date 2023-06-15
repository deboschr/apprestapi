const express = require("express");
const auth = require("./auth");
const router = express.Router(); // R nya harus gede

//daftarkan url registrasi
router.post("/api/v1/register", auth.registration);
//daftarkan url login
router.post("/api/v1/login", auth.login);

module.exports = router;