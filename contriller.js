"use strict";

const respose = require("./res");
const connection = require("./koneksi");

exports.index = function (req, res) {
	respose.ok("Aplikasi REST API berjalan!", res);
};

// menampilkan semua data mahasiswa
exports.showAllMahasiswa = function (req, res) {
	connection.query("SELECT * FROM mahasiswa", function (error, rows, fields) {
		if (error) {
			console.log(error);
		} else {
			respose.ok(rows, res);
		}
	});
};
