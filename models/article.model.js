const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    slug: {
        type: String, required: true
    },
    content: {
        type: String, required: true
    },
    summary: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

articleSchema.index({title: "text", content: "text", summary: "text"});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;