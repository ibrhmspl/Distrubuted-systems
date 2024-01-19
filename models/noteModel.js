const pool = require('../config/db');

class NoteModel {
    async ensureSharedNotesTableExists() {
        const checkTableQuery = `
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_name = 'shared_notes'
            )`;

        const checkTableResult = await pool.query(checkTableQuery);
        const tableExists = checkTableResult.rows[0].exists;

        if (!tableExists) {
            // shared_notes tablosu henüz oluşturulmamışsa, tabloyu oluştur.
            const createTableQuery = `
                CREATE TABLE shared_notes (
                    id SERIAL PRIMARY KEY,
                    note_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    note TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`;

            await pool.query(createTableQuery);
        }
    }
    async shareNoteToAllUsers(noteId) {
        await this.ensureSharedNotesTableExists();
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
