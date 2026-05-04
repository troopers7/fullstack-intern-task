const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let query = db('templates').select('*');
    
    if (category) {
      query = query.where({ category });
    }
    
    if (search) {
      query = query.where('name', 'like', `%${search}%`).orWhere('description', 'like', `%${search}%`);
    }

    const templates = await query;
    res.json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const template = await db('templates').where({ id }).first();
    
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    
    res.json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
