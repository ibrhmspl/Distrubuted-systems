// takeNoteController.js
const takeNoteModel = require('../models/takeNoteModel');

class TakeNoteController {
    async createNote(req, res) {
        const { userId, courseId } = req.params;
        const { content } = req.body;

        try {
            const createdNote = await takeNoteModel.createNote(userId, courseId, content);
            res.json({ message: 'Note created successfully', note: createdNote });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getNoteById(req, res) {
        const { id } = req.params;

        try {
            const note = await takeNoteModel.getNoteById(id);
            res.json({ note });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteNoteById(req, res) {
        const { id } = req.params;

        try {
            const deletedNote = await takeNoteModel.deleteNoteById(id);
            res.json({ message: 'Note deleted successfully', note: deletedNote });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateNoteById(req, res) {
        const { id } = req.params;
        const { content } = req.body;

        try {
            const updatedNote = await takeNoteModel.updateNoteById(id, content);
            res.json({ message: 'Note updated successfully', note: updatedNote });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new TakeNoteController();
