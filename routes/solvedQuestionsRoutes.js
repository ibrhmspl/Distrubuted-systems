const express = require('express');
const solvedQuestionsController = require('../controllers/solvedQuestionsController');
const router = express.Router();

router.post('/mark-question-solved/:userId/:questionId', solvedQuestionsController.markQuestionSolved);

module.exports = router;
