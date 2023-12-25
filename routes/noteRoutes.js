// noteRoutes.js
const express = require('express');
const noteController = require('../controllers/noteController');
const router = express.Router();


router.post('/share-note/:id', noteController.shareNoteToAllUsers);
router.get('/shared-notes', noteController.getSharedNotes);

module.exports = router;
