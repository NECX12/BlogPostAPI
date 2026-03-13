const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser
} = require('../controllers/users.controllers');


router.post('/auth/signup', registerUser);
router.post('/auth/login', loginUser);

module.exports = router;