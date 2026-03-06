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
    }
}, {
    timestamps: true
});

articleSchema.index({title: "text", content: "text", summary: "text"});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;