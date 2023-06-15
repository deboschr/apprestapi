const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const morgan = require("morgan");

const app = express();
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

routes(app);

// mendaftarkan menu routes dari index
app.use("/auth", require("./middleware"));

app.listen(3000, () => {
	console.log("Server berjalan: http://localhost:3000");
});
