const express = require('express');
const router = express.Router();
const dbMethods = require('../database/methods');

router.get('/', async (req, res, next) => {
    try {
        const questions = await dbMethods.getAllQuestions();
        res.json({ questions });
    } catch (error) {
        next(error);
    }
});

module.exports = router;