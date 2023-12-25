const pool = require('../config/db');

class QuestionModel {
    async createQuestion(userId, content) {
        const query = 'INSERT INTO asked_questions (user_id, content) VALUES ($1, $2) RETURNING *';
        const values = [userId, content];

        const result = await pool.query(query, values);
        return result.rows[0];
    }
    async getQuestions() {
        const query = 'SELECT * FROM asked_questions';
        const result = await pool.query(query);
        return result.rows;
    }

    async shareQuestion(userId, questionId) {
        const query = 'INSERT INTO shared_questions (user_id, question_id) VALUES ($1, $2) RETURNING *';
        const values = [userId, questionId];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async shareSolvedQuestion(userId, questionId, content) {
        const query = 'INSERT INTO shared_solved_questions (user_id, question_id, content) VALUES ($1, $2, $3) RETURNING *';
        const values = [userId, questionId, content];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

}

module.exports = new QuestionModel();
