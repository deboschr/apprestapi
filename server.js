const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(3000, () => {
	console.log("Server berjalan: http://localhost:3000");
});
