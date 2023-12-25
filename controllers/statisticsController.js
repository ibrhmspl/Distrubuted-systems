// statisticsController.js
const statisticsModel = require('../models/statisticsModel');

class StatisticsController {
    async getCourseStatistics(req, res) {
        const { userId, courseId } = req.params;

        try {
            // Belirli bir kurs için kullanıcının çözdüğü soru yüzdesini al
            const percentage = await statisticsModel.getCourseCompletionPercentage(userId, courseId);

            res.json({ percentage });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new StatisticsController();
