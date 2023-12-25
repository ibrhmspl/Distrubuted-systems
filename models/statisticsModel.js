// statisticsModel.js
const pool = require('../config/db');

class StatisticsModel {
    async getCourseCompletionPercentage(userId, courseId) {
        const query = `
            SELECT
                COALESCE(
                        COUNT(DISTINCT cq.id) * 100.0 / NULLIF(COUNT(DISTINCT cq.id), 0),
                        0
                ) AS completion_percentage
            FROM user_courses uc
                     LEFT JOIN questions cq ON uc.course_id = cq.category_id
            WHERE uc.user_id = $1 AND uc.course_id = $2 AND cq.solved = true;
        `;

        const values = [userId, courseId];

        const result = await pool.query(query, values);
        return result.rows[0].completion_percentage;
    }
}

module.exports = new StatisticsModel();
