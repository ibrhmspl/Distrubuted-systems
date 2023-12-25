const questionModel = require('../models/questionModel');

class QuestionController {
    async createQuestion(req, res) {
        const { userId } = req.params;
        const { content } = req.body;

        try {
            const createdQuestion = await questionModel.createQuestion(userId, content);
            res.json({ message: 'Question created successfully', question: createdQuestion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getQuestions(req, res) {
        try {
            const questions = await questionModel.getQuestions();
            res.json({ questions });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async shareQuestion(req, res) {
        const { userId } = req.params;
        const { questionId } = req.params;

        try {
            const sharedQuestion = await questionModel.shareQuestion(userId, questionId);
            res.json({ message: 'Question shared successfully', sharedQuestion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async shareSolvedQuestion(req, res) {
        const { userId, questionId } = req.params;
        const { content } = req.body;

        try {
            const sharedSolvedQuestion = await questionModel.shareSolvedQuestion(userId, questionId, content);
            res.json({ message: 'Solved question shared successfully', sharedSolvedQuestion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = new QuestionController();
