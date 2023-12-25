const pool = require('../config/db');

class CourseDetailsModel {
    async createCourseDetailsTable() {
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS course_details (
            id SERIAL PRIMARY KEY,
            course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
            content TEXT NOT NULL
          )
        `;

        await pool.query(createTableQuery);
    }

    async seedDefaultCourseDetails() {
        const seedQuery = `
          INSERT INTO course_details (course_id, content)
          VALUES 
            ((SELECT id FROM courses WHERE title = 'Course 1'), 'Detailed content for Course 1'),
            ((SELECT id FROM courses WHERE title = 'Course 2'), 'Detailed content for Course 2'),
            ((SELECT id FROM courses WHERE title = 'Course 3'), 'Detailed content for Course 3')
        `;

        await pool.query(seedQuery);
    }

    async getCourseDetailsByCourseId(courseId) {
        await this.createCourseDetailsTable();
        await this.seedDefaultCourseDetails(); // seed fonksiyonunu burada çağırın
        const selectQuery = 'SELECT * FROM course_details WHERE course_id = $1';
        const values = [courseId];
        const result = await pool.query(selectQuery, values);
        return result.rows;
    }
}

module.exports = new CourseDetailsModel();
