// takeNoteModel.js
const pool = require('../config/db');

class TakeNoteModel {
    async ensureTableExists() {
        const checkTableQuery = `
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_name = 'user_course_notes'
            )`;

        const checkTableResult = await pool.query(checkTableQuery);
        const tableExists = checkTableResult.rows[0].exists;

        if (!tableExists) {
            // Tablo henüz oluşturulmamışsa, tabloyu oluştur.
            const createTableQuery = `
                CREATE TABLE user_course_notes (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL,
                    course_id INTEGER NOT NULL,
                    content TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`;

            await pool.query(createTableQuery);
        }
    }
    async createNote(userId, courseId, content) {
        await this.ensureTableExists();
        const query = 'INSERT INTO user_course_notes (user_id, course_id, content) VALUES ($1, $2, $3) RETURNING *';
        const values = [userId, courseId, content];

        const result = await pool.query(query, values);
        return result.rows[0];
    }
    async getNoteById(noteId) {
        const query = 'SELECT * FROM user_course_notes WHERE id = $1';
        const values = [noteId];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async deleteNoteById(noteId) {
        const query = 'DELETE FROM user_course_notes WHERE id = $1 RETURNING *';
        const values = [noteId];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async updateNoteById(noteId, content) {
        const query = 'UPDATE user_course_notes SET content = $1 WHERE id = $2 RETURNING *';
        const values = [content, noteId];

        const result = await pool.query(query, values);
        return result.rows[0];
    }
}

module.exports = new TakeNoteModel();
