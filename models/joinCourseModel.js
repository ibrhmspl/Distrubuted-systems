const pool = require('../config/db');

class JoinCourseModel {
    async createJoinCourseTable() {
        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS user_courses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        joined_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `;

        await pool.query(createTableQuery);
    }

    async joinCourse(userId, courseId) {
        await this.createJoinCourseTable();

        const query = 'INSERT INTO user_courses (user_id, course_id) VALUES ($1, $2) RETURNING *';
        const values = [userId, courseId];

        const result = await pool.query(query, values);
        return result.rows[0];
    }
}

module.exports = new JoinCourseModel();
