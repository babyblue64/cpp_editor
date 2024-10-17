const express = require('express');
const router = express.Router();
const { compileCode, generateFullCode } = require('../utils/codeHelpers');
const dbMethods = require('../database/methods');

router.use(express.json());

router.post('/', async (req, res) => {
    const { id, code } = req.body;
    try {
        const question = await dbMethods.getQuestion(id);
        const testCases = await dbMethods.getTestCases(id);
        const result = [];

        for(let testCase of testCases) {
            const fullCode = generateFullCode(question.function_name, testCase.input, code);
            const response = await compileCode(fullCode);
            if (response === testCase.expected_output) {
                result.push(true);
            } else {
                result.push(false);
            }
        }
        res.json({ result });
    } catch (error) {
        console.error('Error:', error);
    }
});

module.exports = router;