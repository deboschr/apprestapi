"use strict";

module.exports = function (app) {
	const myJSON = require("./contriller");

	app.route("/").get(myJSON.index);
};
