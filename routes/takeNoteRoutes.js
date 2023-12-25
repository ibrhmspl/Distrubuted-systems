// takeNoteRoutes.js
const express = require('express');
const takeNoteController = require('../controllers/takeNoteController');
const router = express.Router();

router.post('/take-note/:userId/:courseId', takeNoteController.createNote);
router.get('/get-note/:id', takeNoteController.getNoteById);
router.delete('/delete-note/:id', takeNoteController.deleteNoteById);
router.put('/change-note/:id', takeNoteController.updateNoteById);

module.exports = router;
