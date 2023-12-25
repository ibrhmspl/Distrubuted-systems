const express = require('express');
const courseDetailsController = require('../controllers/courseDetailsController');
const router = express.Router();

router.get('/course-details/:courseId', courseDetailsController.getCourseDetails);

module.exports = router;
