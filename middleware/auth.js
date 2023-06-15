const connection = require("../koneksi");
const mysql = require("mysql");
const md5 = require("md5");
const response = require("../res");
const jwt = require("jsonwebtoken");
const config = require("../config/secret");
const ip = require("ip");

// controller for registration
exports.registration = function (req, res) {
	const { username, email, password, role, tanggal } = req.body;

	const post = {
		username,
		email,
		password: md5(password),
		role,
		tanggal: new Date(tanggal),
	};

	const checkEmailQuery = "SELECT email FROM user WHERE email = ?";
	const checkEmailValues = [post.email];

	connection.query(checkEmailQuery, checkEmailValues, function (err, rows) {
		if (err) {
			console.log(err);
			response.error("Internal Server Error", res);
		} else {
			if (rows.length === 0) {
				const insertUserQuery = "INSERT INTO user SET ?";
				connection.query(insertUserQuery, post, function (error, result) {
					if (error) {
						console.log(error);
						response.error("Failed to insert user", res);
					} else {
						response.ok("Successfully added a new user!", res);
					}
				});
			} else {
				response.error("Email already registered!", res);
			}
		}
	});
};

// controller for login
exports.login = function (req, res) {
	const { email, password } = req.body;

	const loginQuery = "SELECT * FROM user WHERE email = ? AND password = ?";
	const loginValues = [email, md5(password)];

	connection.query(loginQuery, loginValues, function (error, rows) {
		if (error) {
			console.log(error);
			response.error("Internal Server Error", res);
		} else {
			if (rows.length === 1) {
				const user = rows[0];
				const token = jwt.sign({ user }, config.secret, { expiresIn: "24h" });

				const tokenData = {
					id_user: user.id,
					access_token: token,
					ip_address: ip.address(),
				};

				const insertTokenQuery = "INSERT INTO token SET ?";
				connection.query(insertTokenQuery, tokenData, function (error, result) {
					if (error) {
						console.log(error);
						response.error("Failed to generate token", res);
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
				response.error("Invalid email or password!", res);
			}
		}
	});
};
