"use strict";

const { json } = require("body-parser");

module.exports = function (app) {
	const myJSON = require("./contriller");

	app.route("/").get(myJSON.index);
	app.route("/show").get(myJSON.showAllMahasiswa);
	app.route("/show/:id").get(myJSON.showById);
	app.route("/add").post(myJSON.add);
	app.route("/edit").put(myJSON.edit);
	app.route("/delete").delete(myJSON.delete);
	app.route("/showGroupMatakuliah").get(myJSON.showGroupMatakuliah);
};
