const jwt = require("jsonwebtoken");
const config = require("../config/secret");

function verification() {
	return function (req, rest, next) {
		let role = req.body.role;
		// cek authorizzation header
		let tokenWithBearer = req.headers.authorization;
		if (tokenWithBearer) {
			let token = tokenWithBearer.split(" ")[1];
			//verifikasi
			jwt.verify(token, config.secret, function (err, decoded) {
				if (err) {
					return rest
						.status(401)
						.send({ auth: false, message: "Token tidak terdaftar!" });
				} else {
					if (role == "siswa") {
						req.auth = decoded;
						next();
					} else {
						return rest.status(401).send({
							auth: false,
							message: "Role gagal ter-OTORISASI!",
						});
					}
				}
			});
		} else {
			return rest.status(401).send({
				auth: false,
				message: "Token tidak tersedia!",
			});
		}
	};
}

module.exports = verification;
