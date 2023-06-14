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

// menampilkan data mahasiswa berdasarkan id
exports.showById = function (req, res) {
	const id = req.params.id;
	connection.query(
		"SELECT * FROM mahasiswa WHERE id = ?",
		[id],
		function (error, rows, fields) {
			if (error) {
				console.log(error);
			} else {
				respose.ok(rows, res);
			}
		}
	);
};

// Menambahkan data
exports.add = function (req, res) {
	const nama = req.body.nama;
	const npm = req.body.npm;
	const jurusan = req.body.jurusan;

	connection.query(
		"INSERT INTO mahasiswa (nama, npm, jurusan) VALUES (?, ?, ?)",
		[nama, npm, jurusan],
		function (error, rows, fields) {
			if (error) {
				console.log(error);
			} else {
				respose.ok("Berhasil menambahkan data", res);
			}
		}
	);
};
