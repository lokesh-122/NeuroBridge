import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import chatRoutes from './routes/chat';
import moodRoutes from './routes/mood'; // 👈 NEW
import historyRoutes from './routes/history';
import analysisRoutes from './routes/analysis';
import resourcesRoutes from './routes/resources';
import profileRoutes from './routes/profile';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/api/chat', chatRoutes);
app.use('/api/mood', moodRoutes); // 👈 NEW
app.use('/api/history', historyRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/profile', profileRoutes);


mongoose.connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB Connection Error:', err));
