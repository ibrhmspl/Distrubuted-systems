const pool = require('../config/db');

class CourseModel {
    async createCourseTable() {
        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        instructor VARCHAR(255),
        price NUMERIC(10, 2) DEFAULT 0.0
      )
    `;

        await pool.query(createTableQuery);
    }

    async seedDefaultCourses() {
        const seedQuery = `
      INSERT INTO courses (title, description, instructor, price)
      VALUES 
        ('Course 1', 'Description for Course 1', 'Instructor 1', 19.99),
        ('Course 2', 'Description for Course 2', 'Instructor 2', 29.99),
        ('Course 3', 'Description for Course 3', 'Instructor 3', 39.99)
    `;

        await pool.query(seedQuery);
    }

    async getAllCourses() {
        await this.createCourseTable();
        await this.seedDefaultCourses();

        const selectQuery = 'SELECT * FROM courses';
        const result = await pool.query(selectQuery);
        return result.rows;
    }
}

module.exports = new CourseModel();
