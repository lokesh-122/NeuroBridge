import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  prompt: { type: String, required: true },
  reply: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Chat', chatSchema);
