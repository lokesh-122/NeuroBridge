import express from 'express';
import Mood from '../models/Mood';

const router = express.Router();

// POST mood entry
router.post('/', async (req: express.Request, res: express.Response) => {
  const { userId, mood } = req.body;
  if (!userId || !mood) return res.status(400).json({ error: 'Missing data' });

  try {
    const entry = await Mood.create({ userId, mood });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save mood' });
  }
});

// GET all mood entries
router.get('/:userId', async (req, res) => {
  try {
    const entries = await Mood.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch moods' });
  }
});

export default router;
