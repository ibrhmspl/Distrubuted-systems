const pool = require('../config/db');

class QuestionsSolveModel {
    async markQuestionSolved(userId, questionId) {
        const query = 'UPDATE questions SET solved = true WHERE id = $1 AND category_id IN (SELECT course_id FROM user_courses WHERE user_id = $2) RETURNING *';
        const values = [questionId, userId];

        const result = await pool.query(query, values);

        // Eğer bir satır etkilendiyse (soru bulundu ve güncellendi), true döndür
        return result.rowCount > 0;
    }
}

module.exports = new QuestionsSolveModel();
