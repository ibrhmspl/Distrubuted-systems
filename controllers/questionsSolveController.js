const questionsSolveModel = require('../models/questionsSolveModel');

class QuestionsSolveController {
    async getQuestionsByUserIdAndCourseId(req, res) {
        const { userId, courseId } = req.params;

        try {
            const questions = await questionsSolveModel.getQuestionsByUserIdAndCourseId(userId, courseId);
            res.json({ questions });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new QuestionsSolveController();
