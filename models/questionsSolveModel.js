const pool = require('../config/db');

class QuestionsSolveModel {
    async initQuestionsTable() {
        const checkTableQuery = `
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_name = 'questions'
            );
        `;
        const tableCheckResult = await pool.query(checkTableQuery);

        if (!tableCheckResult.rows[0].exists) {
            const createTableQuery = `
                CREATE TABLE questions (
                                           id SERIAL PRIMARY KEY,
                                           question_text TEXT,
                                           category_id INT,
                                           solved BOOLEAN DEFAULT false
                );
            `;
            await pool.query(createTableQuery);


            const insertDefaultDataQuery = `
                INSERT INTO questions (question_text, category_id, solved)
                VALUES
                    ('Default Question 1', 1, false),
                    ('Default Question 2', 2, false),
                    ('Default Question 3', 1, false),
                    ('Default Question 4', 3, false),
                    ('Default Question 5', 2, false);
            `;
            await pool.query(insertDefaultDataQuery);
        }
    }
    async getQuestionsByUserIdAndCourseId(userId, courseId) {
        await this.initQuestionsTable()
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
