const joinCourseModel = require('../models/joinCourseModel');

class JoinCourseController {
    async joinCourse(req, res) {
        const { userId } = req.params;
        const courseId = req.params.courseId;

        try {
            const joinedCourse = await joinCourseModel.joinCourse(userId, courseId);
            res.json({ message: 'Successfully joined the course', joinedCourse });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new JoinCourseController();
