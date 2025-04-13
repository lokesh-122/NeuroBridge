import express from 'express';
import Chat from '../models/Chat';

const router = express.Router();

// GET /api/history/:userId
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const history = await Chat.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

export default router;
