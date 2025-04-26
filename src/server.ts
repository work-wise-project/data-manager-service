import express from 'express';
import { userRouter, interviewRouter } from './router/';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Data Manager Server is running!');
});

app.use('/users', userRouter);
app.use('/interviews', interviewRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
