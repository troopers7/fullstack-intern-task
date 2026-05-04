const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    
    const favorites = await db('favorites')
      .join('templates', 'favorites.template_id', '=', 'templates.id')
      .where('favorites.user_id', userId)
      .select('templates.*', 'favorites.id as favorite_id');
      
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:templateId', async (req, res) => {
  try {
    const userId = req.user.id;
    const { templateId } = req.params;

    // Check if it's already favorited
    const existing = await db('favorites').where({ user_id: userId, template_id: templateId }).first();

    if (existing) {
      // If it is, un-favorite it (toggle)
      await db('favorites').where({ id: existing.id }).del();
      return res.json({ message: 'Removed from favorites', favorited: false });
    } else {
      // If not, add to favorites
      await db('favorites').insert({ user_id: userId, template_id: templateId });
      return res.status(201).json({ message: 'Added to favorites', favorited: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
