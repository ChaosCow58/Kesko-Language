const mongoose = require("mongoose");

const verbSchema = new mongoose.Schema({
	group: {
		type: String,
		required: true,
		trim: true
	},
	word: {
		type: String,
		required: true,
		trim: true,
	},
	pronunciation: {
		type: String,
		required: true,
		trim: true,
	},
	definitions: [
		{
			_id: false,
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
	conjugations: {
		past: {
			singular: {
				firstPerson: {
					type: String,
					trim: true,
				},
				secondPerson: {
					type: String,
					trim: true,
				},
				thirdPerson: {
					type: String,
					trim: true,
				},
			},
			plural: {
				firstPerson: {
					type: String,
					trim: true,
				},
				secondPerson: {
					type: String,
					trim: true,
				},
				thirdPerson: {
					type: String,
					trim: true,
				},
			},
		},
		present: {
			singular: {
				firstPerson: {
					type: String,
					trim: true,
				},
				secondPerson: {
					type: String,
					trim: true,
				},
				thirdPerson: {
					type: String,
					trim: true,
				},
			},
			plural: {
				firstPerson: {
					type: String,
					trim: true,
				},
				secondPerson: {
					type: String,
					trim: true,
				},
				thirdPerson: {
					type: String,
					trim: true,
				},
			},
		},
		future: {
			singular: {
				firstPerson: {
					type: String,
					trim: true,
				},
				secondPerson: {
					type: String,
					trim: true,
				},
				thirdPerson: {
					type: String,
					trim: true,
				},
			},
			plural: {
				firstPerson: {
					type: String,
					trim: true,
				},
				secondPerson: {
					type: String,
					trim: true,
				},
				thirdPerson: {
					type: String,
					trim: true,
				},
			},
		},
	},
});

const Verbs = mongoose.model("Verb", verbSchema);

module.exports = Verbs;
