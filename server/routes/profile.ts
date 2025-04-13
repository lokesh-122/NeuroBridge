import express from 'express';
import User from '../models/User';

const router = express.Router();

// POST /api/profile/save
router.post('/save', async (req, res) => {
  const { auth0Id, email } = req.body;
  if (!auth0Id) return res.status(400).json({ error: 'auth0Id is required' });

  try {
    const user = await User.findOneAndUpdate(
      { auth0Id },
      { email },
      { upsert: true, new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save user' });
  }
});

export default router;
