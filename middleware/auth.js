const connection = require("../koneksi");
const mysql = require("mysql");
const md5 = require("md5");
const response = require("../res");
const jwt = require("jsonwebtoken");
const config = require("../config/secret");
const ip = require("ip");
const { query } = require("express");

// controller for registration
exports.registration = function (req, res) {
	let dataUser = {
		username: req.body.username,
		email: req.body.email,
		password: md5(req.body.password),
		role: req.body.role,
		tanggal: new Date(),
	};

	let checkEmailQuery = "SELECT email FROM ?? WHERE ?? = ?";
	let checkEmailValues = ["user", "email", dataUser.email];

	checkEmailQuery = mysql.format(checkEmailQuery, checkEmailValues);
	connection.query(checkEmailQuery, function (error, rows) {
		if (error) {
			console.log(error);
		} else {
			if (rows.length == 0) {
				let addQuery = "INSERT INTO ?? SET ?";
				let addTabel = ["user"];
				addQuery = mysql.format(addQuery, addTabel);
				connection.query(addQuery, dataUser, function (error, rows) {
					if (error) {
						console.log(error);
					} else {
						response.ok("Berhasil menambahkan data user baru", res);
					}
				});
			} else {
				response.ok("Email sudah terdaftar!", res);
			}
		}
	});
};

// controller for login
//#### CARA 1
// exports.login = function (req, res) {
// 	let post = {
// 		password: req.body.password,
// 		email: req.body.email,
// 	};

// 	let loginQuery = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
// 	let loginValue = [
// 		"user",
// 		"password",
// 		md5(post.password),
// 		"email",
// 		post.email,
// 	];

// 	loginQuery = mysql.format(loginQuery, loginValue);
// 	connection.query(loginQuery, function (error, rows) {
// 		if (error) {
// 			console.log(error);
// 		} else {
// 			if (rows.length == 1) {
// 				let token = jwt.sign({ rows }, config.secret, { expiresIn: 1440 });
// 				let id_user = rows[0].id;
// 				let data = {
// 					id_user: id_user,
// 					access_token: token,
// 					ip_address: ip.address(),
// 				};
// 				let insertQuery = "INSERT INTO ?? SET ?";
// 				let table = ["token"];
// 				insertQuery = mysql.format(insertQuery, table);
// 				connection.query(insertQuery, data, function (error, rows) {
// 					if (error) {
// 						console.log(error);
// 					} else {
// 						res.json({
// 							success: true,
// 							message: "Token JWT tergenerate",
// 							token: token,
// 							currUser: data.id_user,
// 						});
// 					}
// 				});
// 			} else {
// 				res.json({ error: true, message: "Email atau password salah!" });
// 			}
// 		}
// 	});
// };

//#### CARA 2
exports.login = function (req, res) {
	let { email, password } = req.body;

	let loginQuery = "SELECT * FROM user WHERE email = ? AND password = ?";
	let loginValues = [email, md5(password)];

	connection.query(loginQuery, loginValues, function (error, rows) {
		if (error) {
			console.log(error);
			response.error("Internal Server Error", res);
		} else {
			if (rows.length === 1) {
				let user = rows[0];
				let token = jwt.sign({ user }, config.secret, { expiresIn: "24h" });

				let tokenData = {
					id_user: user.id,
					access_token: token,
					ip_address: ip.address(),
				};

				let insertTokenQuery = "INSERT INTO token SET ?";
				connection.query(insertTokenQuery, tokenData, function (error, result) {
					if (error) {
						console.log(error);
						response.ok("Failed to generate token", res);
					} else {
						res.json({
							success: true,
							message: "JWT token generated",
							token: token,
							currentUser: tokenData.id_user,
						});
					}
				});
			} else {
				response.ok("Invalid email or password!", res);
			}
		}
	});
};
