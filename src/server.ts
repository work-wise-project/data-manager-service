import express from 'express';
import { interviewRouter, userRouter } from './router/';
import resumeRoute from './router/resumeRoute';
import skillRoute from './router/skillRoute';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Data Manager Server is running!');
});

app.use('/users', userRouter);
app.use('/interviews', interviewRouter);
app.use('/skills', skillRoute);
app.use('/resume', resumeRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
