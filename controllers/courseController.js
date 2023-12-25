const courseModel = require('../models/courseModel');

class CourseController {
    async getAllCourses(req, res) {
        try {
            const courses = await courseModel.getAllCourses();
            res.json(courses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new CourseController();
