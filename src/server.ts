import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes/authRoutes';
import decisionRoutes from './routes/decisionRoutes/decisionRoutes';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.EXPECTED_ORIGIN,
  })
);

app.use('/auth', authRoutes);
app.use('/decisions', decisionRoutes);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});