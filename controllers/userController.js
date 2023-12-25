const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

class UserController {
    async register(req, res) {
        const { username,usersurname, email,usersection, password } = req.body;

        try {
            const user = await userModel.createUser(username,usersurname, email,usersection, password);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await userModel.getUserByUsername(username);

            if (!user || user.password !== password) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

            res.json({ user, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new UserController();
