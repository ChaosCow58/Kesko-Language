const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
	group: {
		type: String,
		required: true,
		trim: true
	},
	word: {
		type: String,
		required: true,
		trim: true
	},
	pronunciation: {
		type: String,
		required: true,
        trim: true
	},
	definitions: [
		{
			_id: false,
			type: {
				type: String,
				required: true,
				enum: [
					"noun",
					"verb",
					"adjective",
					"adverb",
					"preposition",
					"conjunction",
					"interjection",
					"pronoun",
					"article",
				],
                trim: true,
			},
			definition: {
				type: String,
				required: true,
                trim: true,
			},
			example: {
				type: String,
				required: true,
                trim: true,
			},
		},
	],
	synonyms: [
		{
			type: String,
            trim: true,
		},
	],
	antonyms: [
		{
			type: String,
			trim: true,
		},
	],
	tags: [
		{
			type: String,
			trim: true,
		},
	],
	origin: {
		type: String,
		trim: true,
	},
    forms: {
        plural: {
            type: String,
            trim: true
        },
        pastTense: {
            type: String,
            trim: true
        },
        comparative: {
            type: String,
            trim: true
        },
        superlative: {
            type: String,
            trim: true
        },
    }
});

const Words = mongoose.model("Word", wordSchema);

module.exports = Words;
