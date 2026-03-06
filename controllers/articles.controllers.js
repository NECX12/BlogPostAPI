const Joi = require("joi");
const ArticleModel = require("../models/article.model");

createArticle = async (req, res) => {
    const newArticle = Joi.object({
        title: Joi.string().min(5).required(),
        slug: Joi.string().required(),
        content: Joi.string().required(),
        summary: Joi.string()
    })

    const {error, value} = newArticle.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    try {
        const newArticle = new ArticleModel(value);
        await newArticle.save();
        return res.status(201).json({
            message: "Article Successfully Created!",
            article: newArticle
        })
    } catch (error) {
        console.error(error);
        next(error);
        
    }

};

