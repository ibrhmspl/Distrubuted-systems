const pool = require('../config/db');

class QuestionModel {
    async ensureSharedQuestionsTableExists() {
        const checkTableQuery = `
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_name = 'shared_questions'
            )`;

        const checkTableResult = await pool.query(checkTableQuery);
        const tableExists = checkTableResult.rows[0].exists;

        if (!tableExists) {
            // shared_questions tablosu henüz oluşturulmamışsa, tabloyu oluştur.
            const createTableQuery = `
                CREATE TABLE shared_questions (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL,
                    question_id INTEGER NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`;

            await pool.query(createTableQuery);
        }
    }
    async ensureAskedQuestionsTableExists() {
        const checkTableQuery = `
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_name = 'asked_questions'
            )`;

        const checkTableResult = await pool.query(checkTableQuery);
        const tableExists = checkTableResult.rows[0].exists;

        if (!tableExists) {
            // asked_questions tablosu henüz oluşturulmamışsa, tabloyu oluştur.
            const createTableQuery = `
                CREATE TABLE asked_questions (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL,
                    content TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`;

            await pool.query(createTableQuery);
        }
    }
    async ensureSharedSolvedQuestionsTableExists() {
        const checkTableQuery = `
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_name = 'shared_solved_questions'
            )`;

        const checkTableResult = await pool.query(checkTableQuery);
        const tableExists = checkTableResult.rows[0].exists;

        if (!tableExists) {
            // shared_solved_questions tablosu henüz oluşturulmamışsa, tabloyu oluştur.
            const createTableQuery = `
                CREATE TABLE shared_solved_questions (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL,
                    question_id INTEGER NOT NULL,
                    content TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`;

            await pool.query(createTableQuery);
        }
    }
    async createQuestion(userId, content) {
        await this.ensureAskedQuestionsTableExists();
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
        await this.ensureSharedQuestionsTableExists();
        const query = 'INSERT INTO shared_questions (user_id, question_id) VALUES ($1, $2) RETURNING *';
        const values = [userId, questionId];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async shareSolvedQuestion(userId, questionId, content) {
        await this.ensureSharedSolvedQuestionsTableExists();
        const query = 'INSERT INTO shared_solved_questions (user_id, question_id, content) VALUES ($1, $2, $3) RETURNING *';
        const values = [userId, questionId, content];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

}

module.exports = new QuestionModel();
