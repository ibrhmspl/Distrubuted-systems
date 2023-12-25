const express = require('express');
const questionsSolveController = require('../controllers/questionsSolveController');
const router = express.Router();

router.get('/questions-solve/:userId/:courseId', questionsSolveController.getQuestionsByUserIdAndCourseId);

module.exports = router;
