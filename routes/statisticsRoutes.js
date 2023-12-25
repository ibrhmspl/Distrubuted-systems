const express = require('express');
const statisticsController = require('../controllers/statisticsController');
const router = express.Router();

router.get('/statistics/:userId/:courseId', statisticsController.getCourseStatistics);

module.exports = router;
