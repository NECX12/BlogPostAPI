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


const getAllArticles = async (req, res, next) => {
    const {limit=10, page=1} = req.query;
    const skip = (page - 1) * limit;

    try {
        
        const articles = await ArticleModel.find({})
        .sort({createdAt: -1})
        .limit(limit)
        .skip(skip);

    } catch (error) {
        
    }
};


const getArticleById = async (req, res, next) => {
    const {id} = req.params;

    try {
        const article = await ArticleModel.findById(id);
        if (!article) {
            return res.status(404).json({
                message: "Article not found!"
            })
        }
        res.status(200).json({
            message: "Article has been successfully retrieved!",
            article: article
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
};


const getArticleBySlug = async (req, res, next) => {
    const {slug} = req.params;

    try {
        const article = await ArticleModel.findOne({
            slug: slug
        })
        if (!article) {
            return res.status(404).json({
                message: "Article not Found!"
            })
        }

        res.status(200).json({
            message: "Article Successfully Retrieved from the Database",
            article: article
        })
    } catch (error) {
        next(error);
    }
};


const updateArticleById = async (req, res, next) => {
    const {id} = req.params;
    try {
        const articleSchema = Joi.object({
            title: Joi.string().min(5),
            slug: Joi.string(),
            content: Joi.string(),
            summary: Joi.string()
        })

        const {error, value} = articleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        const updatedArticle = await ArticleModel.findByIdAndUpdate(id, value, {new: true});
        if (!updatedArticle) {
            return res.status(404).json({
                message: "Article not Found!"
            })
        }

        res.status(200).json({
            message: "Article Successfully Updated!",
            article: updatedArticle
        });
        
    } catch (error) {
        next(error);
        
    }
};

