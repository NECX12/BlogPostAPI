const express = require('express');
const router = express.Router();
const {
    createArticle,
    getAllArticles,
    searchArticles,
    getArticleById,
    getArticleBySlug,
    updateArticleById,
    deleteArticleById
} = require('../controllers/articles.controllers');
const requireAuth = require('../middleware/requireAuth');

//router.post('/articles', createArticle);
//router.get('/articles', getAllArticles);
//router.get('/articles/search', searchArticles);
//router.get('/articles/:id', getArticleById);
//router.get('/articles/slug/:slug', getArticleBySlug);
//router.put('/articles/:id', updateArticleById);
//router.delete('/articles/:id', deleteArticleById);

router.get('/articles/search', searchArticles);
router.get('/articles/slug/:slug', getArticleBySlug);
router.get('/articles/:id', getArticleById);
router.post('/articles', createArticle);
router.get('/articles', requireAuth, getAllArticles);
router.put('/articles/:id', updateArticleById);
router.delete('/articles/:id', deleteArticleById);

module.exports = router;