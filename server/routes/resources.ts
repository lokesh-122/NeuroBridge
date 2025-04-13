import express from 'express';

const router = express.Router();

// Static helpful links or AI-generated later
router.get('/', (_req, res) => {
  const resources = [
    { title: 'Grounding Techniques', link: 'https://www.therapistaid.com/worksheets/grounding-techniques.pdf' },
    { title: 'Self-Advocacy Tips', link: 'https://www.autistica.org.uk/downloads/files/Autism-and-Self-Advocacy-Tips.pdf' },
    { title: 'Mindfulness Activities', link: 'https://www.mindful.org/mindfulness-for-kids/' },
    { title: 'Neurodivergent Coping Skills', link: 'https://embrace-autism.com/coping-strategies/' }
  ];

  res.json(resources);
});

export default router;
