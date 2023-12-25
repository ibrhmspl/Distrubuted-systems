const express = require('express');
const joinCourseController = require('../controllers/joinCourseController');
const router = express.Router();

router.post('/join-course/:userId/:courseId', joinCourseController.joinCourse);

module.exports = router;
