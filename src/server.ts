import express from 'express';
import userRoute from './router/userRoute';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Data Manager Server is running!');
});

app.use('/users', userRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
