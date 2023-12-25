const pool = require('../config/db');

class UserModel {
    async createUserTable() {
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            usersurname VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            usersection VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
          )
        `;

        await pool.query(createTableQuery);
    }

    async createUser(username,usersurname, email,usersection, password) {
        
        await this.createUserTable();
        
        const insertQuery = 'INSERT INTO users (username,usersurname, email,usersection, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [username,usersurname, email,usersection, password];

        const result = await pool.query(insertQuery, values);
        return result.rows[0];
    }

    async getUserByUsername(username) {
        await this.createUserTable();

        const selectQuery = 'SELECT * FROM users WHERE username = $1';
        const values = [username];

        const result = await pool.query(selectQuery, values);
        return result.rows[0];
    }
}

module.exports = new UserModel();
