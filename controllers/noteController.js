// noteController.js
const noteModel = require('../models/noteModel');

class NoteController {
    async shareNoteToAllUsers(req, res) {
        const { id } = req.params;

        try {
            const sharedNote = await noteModel.shareNoteToAllUsers(id);
            res.json({ message: 'Note shared to all users successfully', sharedNote });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getSharedNotes(req, res) {
        try {
            const sharedNotes = await noteModel.getSharedNotes();
            res.json({ sharedNotes });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new NoteController();
