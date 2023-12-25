const pool = require('../config/db');

class QuestionsSolveModel {
    async getQuestionsByUserIdAndCourseId(userId, courseId) {
        const query = `
      SELECT q.*
      FROM questions q
      INNER JOIN questions cq ON q.id = cq.id
      INNER JOIN user_courses uc ON cq.category_id = uc.course_id
      WHERE uc.user_id = $1 AND uc.course_id = $2
    `;

        const values = [userId, courseId];

        const result = await pool.query(query, values);
        return result.rows;
    }
}

module.exports = new QuestionsSolveModel();
