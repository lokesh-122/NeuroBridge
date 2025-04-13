import express from 'express';
import Mood from '../models/Mood';
import Chat from '../models/Chat';

const router = express.Router();

// GET /api/analysis/:userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const moods = await Mood.find({ userId }).sort({ timestamp: -1 }).limit(10);
    const chats = await Chat.find({ userId }).sort({ timestamp: -1 }).limit(5);

    const moodStats = moods.reduce((acc, mood) => {
      acc[mood.mood] = (acc[mood.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    res.json({
      moodTrends: moodStats,
      recentChats: chats
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to analyze data' });
  }
});

export default router;
