const connection = require("../koneksi");
const mysql = require("mysql");
const md5 = require("md5");
const response = require("../res");
const jwt = require("jsonwebtoken");
const config = require("../config/secret");
const ip = require("ip");

// controller for register
exports.registration = function (req, res) {
	let post = {
		username: req.body.username,
		email: req.body.email,
		password: md5(req.body.password),
		role: req.body.role,
		tanggal: new Date(req.body.tanggal),
	};

	let query = "SELECT email FROM ?? WHERE ?? = ?";
	let table = ["user", "email", post.email];

	query = mysql.format(query, table);

	connection.query(query, function (err, rows) {
		if (err) {
			console.log(err);
		} else {
			if (rows.length == 0) {
				let query = "INSERT INTO ?? SET ?";
				let table = ["user"];
				query = mysql.format(query, table);
				connection.query(query, post, function (error, rows) {
					if (error) {
						console.log(error);
					} else {
						response.ok("Berhasil menambahkan data user baru!", res);
					}
				});
			} else {
				response.ok("Email sudah terdaftar!", res);
			}
		}
	});
};

// controller untuk login
exports.login = function(req, res) {
	let post = {
		email: req.body.email,
		password: req.body.password
	}
}
