const express = require('express');
const questionController = require('../controllers/questionController');
const router = express.Router();

router.post('/create-question/:userId', questionController.createQuestion);
router.get('/get-questions', questionController.getQuestions);
router.post('/share-question/:userId/:questionId',  questionController.shareQuestion);
router.post('/share-solved-question/:userId/:questionId',  questionController.shareSolvedQuestion);

module.exports = router;
