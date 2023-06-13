var mysqli = require("mysql");

// buat keneksi database
const conn = mysqli.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "apprestapi",
});

conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL Terkoneksi");
});

module.exports = conn;