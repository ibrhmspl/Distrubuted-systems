const courseDetailsModel = require('../models/courseDetailsModel');

class CourseDetailsController {
    async getCourseDetails(req, res) {
        const courseId = req.params.courseId;

        try {
            const details = await courseDetailsModel.getCourseDetailsByCourseId(courseId);
            res.json(details);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new CourseDetailsController();
