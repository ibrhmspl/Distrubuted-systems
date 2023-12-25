const pool = require('../config/db');

class NoteModel {
    async shareNoteToAllUsers(noteId) {
        const query = `
            INSERT INTO shared_notes (note_id, user_id, note)
            SELECT ucn.id, ucn.user_id, ucn.content
            FROM user_course_notes ucn
            WHERE ucn.id = $1;
        `;

        const values = [noteId];
        console.log(values);

        await pool.query(query, values);
    }

    async getSharedNotes() {
        const query = `
            SELECT uc.id, uc.content, sn.user_id
            FROM user_course_notes uc
            INNER JOIN shared_notes sn ON uc.id = sn.note_id
        `;

        const result = await pool.query(query);
        return result.rows;
    }
}

module.exports = new NoteModel();
