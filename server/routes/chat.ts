import express from 'express';
import { getGeminiResponse } from '../utils/geminiClient';
import Chat from '../models/Chat';

const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {

  const { prompt, userId } = req.body;

  if (!prompt || !userId) {
    return res.status(400).json({ error: 'Prompt and userId are required' });
  }

  try {
    const reply = await getGeminiResponse(prompt);
    const chat = await Chat.create({ prompt, reply, userId });
    res.json({ reply, chat });
  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({ error: 'Failed to get Gemini response' });
  }
});

export default router;
