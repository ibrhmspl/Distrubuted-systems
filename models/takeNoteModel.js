// takeNoteModel.js
const pool = require('../config/db');

class TakeNoteModel {
    async createNote(userId, courseId, content) {
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
