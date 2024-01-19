const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const courseDetailsRoutes = require('./routes/courseDetailsRoutes');
const joinCourseRoutes = require('./routes/joinCourseRoutes');
const questionsSolveRoutes = require('./routes/questionsSolveRoutes');
const solvedQuestionsRoutes = require('./routes/solvedQuestionsRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const takeNoteRoutes = require('./routes/takeNoteRoutes');
const noteRoutes = require('./routes/noteRoutes');
const questionRoutes = require('./routes/questionRoutes')
const { authenticateToken } = require('./middlewares/authMiddleware');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', courseDetailsRoutes);
app.use('/api', joinCourseRoutes);
app.use('/api', questionsSolveRoutes);
app.use('/api', solvedQuestionsRoutes);
app.use('/api', statisticsRoutes);
app.use('/api', takeNoteRoutes);
app.use('/api', noteRoutes);
app.use('/api', questionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
