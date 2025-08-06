const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const port = 5500;
const url = `http://localhost:${port}`;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.set("/views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

mongoose.connect(process.env.MAINDB);

app.listen(port, () => {
	console.log(`Server is running at ${url}`);
});

app.get("/", (req, res) => {
	res.render("home");
});
