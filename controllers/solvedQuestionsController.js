// questionsSolveController.js
const solvedQuestionsModel = require('../models/solvedQuestionsModel');

class QuestionsSolveController {
    async markQuestionSolved(req, res) {
        const { userId, questionId } = req.params;

        try {
            // Kullanıcı çözdüğü soruyu işaretle
            const result = await solvedQuestionsModel.markQuestionSolved(userId, questionId);

            if (result) {
                res.json({ message: 'Soru çözüldü olarak işaretlendi' });
            } else {
                res.status(404).json({ error: 'Soru bulunamadı veya daha önce çözülmemiş' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new QuestionsSolveController();
