"use strict";

const respose = require("./res");
const connection = require("./koneksi");

exports.index = function (req, res) {
	respose.ok("Aplikasi REST API berjalan!", res);
};
