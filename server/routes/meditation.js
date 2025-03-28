
const express = require('express');
const router = express.Router();
const Meditation = require('../models/Meditation');

// Get all meditations
router.get('/', async (req, res) => {
  try {
    const meditations = await Meditation.find();
    res.json(meditations);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get meditation by ID
router.get('/:id', async (req, res) => {
  try {
    const meditation = await Meditation.findById(req.params.id);
    
    if (!meditation) {
      return res.status(404).json({ error: 'Meditation not found' });
    }
    
    res.json(meditation);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
