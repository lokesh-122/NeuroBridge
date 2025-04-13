import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  mood: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Mood', moodSchema);
