const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

// @route  GET /api/news/top-headlines
// @desc   Proxy top-headlines from NewsAPI
// @access Public
router.get('/top-headlines', async (req, res) => {
  const { country = 'us', category = 'general', page = 1, pageSize = 9 } = req.query;

  try {
    const url = `${BASE_URL}/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'ok') {
      return res.status(400).json({ success: false, message: data.message });
    }

    res.json({
      success: true,
      totalResults: data.totalResults,
      articles: data.articles,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch news: ' + err.message });
  }
});

// @route  GET /api/news/search
// @desc   Search news by keyword
// @access Public
router.get('/search', async (req, res) => {
  const { q, page = 1, pageSize = 9, sortBy = 'publishedAt' } = req.query;

  if (!q) {
    return res.status(400).json({ success: false, message: 'Search query (q) is required' });
  }

  try {
    const url = `${BASE_URL}/everything?q=${encodeURIComponent(q)}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&language=en`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'ok') {
      return res.status(400).json({ success: false, message: data.message });
    }

    res.json({
      success: true,
      totalResults: data.totalResults,
      articles: data.articles,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Search failed: ' + err.message });
  }
});

module.exports = router;
