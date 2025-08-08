const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ quiet: true });

const Words = require("./models/words");

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

const enforceIframeOnly = (req, res, next) => {
	const referer = req.get("Referer") || req.get("Origin");

	if (!referer || !referer.startsWith(url)) {
		res.status(403).render("errors/forbidden");
		return;
	}

	next();
};

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/partials/rules", enforceIframeOnly, (req, res) => {
	res.render(`partials/rules`);
});

app.get("/create", (req, res) => {
	res.render("create");
});

const safeArray = (val) => (Array.isArray(val) ? val : [val]);

app.post("/post/create", async (req, res) => {
	const {
		group,
		word,
		type,
		pronunciation,
		definition,
		example,
		synonym,
		antonym,
		tag,
		origin,
	} = req.body;

	await Words.create({
		group: group,
		word: word,
		pronunciation: pronunciation,
		definitions: safeArray(definition).map((def, i) => ({
			type: safeArray(type)[i] || "noun",
			definition: def,
			example: safeArray(example)[i] || "",
		})),
		synonyms: safeArray(synonym).flat(),
		antonyms: safeArray(antonym).flat(),
		tags: safeArray(tag).flat(),
		origin: origin,
	});

	res.redirect("/");
});

app.get("/partials/word", enforceIframeOnly, async (req, res) => {
	const group = req.query.group;
	const words = await Words.find({ group: group }).lean().select("-_id").sort({ word: 1 });

	res.render(`partials/word`, { words: words });
});

app.get("/partials/verbs", enforceIframeOnly, (req, res) => {
	res.render(`partials/verbs`);
});

app.use((req, res) => {
	res.status(404).render("errors/notfound");
});
