"use strict";

const { json } = require("body-parser");

module.exports = function (app) {
	const myJSON = require("./contriller");

	app.route("/").get(myJSON.index);
	app.route("/tampil").get(myJSON.showAllMahasiswa);
};
