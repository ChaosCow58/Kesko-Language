const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
    group : { 
        type: String,
        required: true,
    },
	word: { 
        type: String, 
        required: true 
    },
    pronunciation: { 
        type: String,
        required: true
    },
	definitions: [{
        type: {
            type: String, 
            required: true,
            enum: ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'interjection', 'pronoun', 'article']
        },
        definition: {
            type: String, 
            required: true,
        },
        example: { 
            type: String, 
            required: true 
        },
    }],
    synonyms: [{ 
        type: String 
    }],
    antonyms: [{ 
        type: String 
    }],
    tags: [{ 
        type: String 
    }],
    origin: { 
        type: String,
    },
});

const Words = mongoose.model("Word", wordSchema);

module.exports = Words;
