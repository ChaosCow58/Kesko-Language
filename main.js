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

app.get("/partials/word", enforceIframeOnly, async (req, res) => {
	const group = req.query.group;
	const words = await Words.find({ group: group }).lean().sort({ word: 1 });

	res.render(`partials/word`, { words: words });
});

const safeArray = (val) => (Array.isArray(val) ? val : [val]);
const cleanEmptyStrings = (obj) =>
	Object.fromEntries(
		Object.entries(obj).filter(([_, v]) => v && v.trim() !== "")
	);

app.post("/post/create", async (req, res) => {
	const {
		isVerb,
		group,
		word,
		pronunciation,
		definitions = {},
		forms = {},
		synonyms,
		antonyms,
		tags,
		origin,
	} = req.body;

	const defTypes = safeArray(definitions.type);
	const defDefs = safeArray(definitions.definition);
	const defExamples = safeArray(definitions.example);

	await Words.create({
		group: group,
		word: word,
		pronunciation: pronunciation,
		definitions: defDefs
			.filter((def) => def && def.trim() !== "")
			.map((def, i) => ({
				type: defTypes[i],
				definition: def,
				example: defExamples[i],
			})),
		synonyms: safeArray(synonyms)
			.flat()
			.filter((syn) => syn && syn.trim() !== ""),
		antonyms: safeArray(antonyms)
			.flat()
			.filter((ant) => ant && ant.trim() !== ""),
		tags: safeArray(tags)
			.flat()
			.filter((tag) => tag && tag.trim() !== ""),
		origin: origin,
		forms: cleanEmptyStrings(forms),
	});

	res.redirect("/");
});

app.post("/post/getUpdate", async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).render("errors/badrequest");
    }

    try {
        const word = await Words.findById(id).lean();

        if (!word) {
            return res.status(404).render("errors/notfound");
        }
		
		res.render("partials/updateWord", { word: word });
    } catch (error) {
        console.error("Error finding or rendering word:", error);
        res.status(500).render("errors/internal");
    }
});

app.post("/post/deleteWord", async (req, res) => {
	const { id } = req.body;

	if (!id) {
		return res.status(400).render("errors/badrequest");
	}

	try {
		await Words.findByIdAndDelete(id);
		res.json({ success: true });
	} catch (error) {
		console.error("Error deleting word:", error);
		res.status(500).render("errors/internal");
	}
});

app.get("/partials/verbs", enforceIframeOnly, (req, res) => {
	res.render(`partials/verbs`);
});

app.use((req, res) => {
	res.status(404).render("errors/notfound");
});
