const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const url = `https://newsapi.org/v2/everything?q=${city}&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`;
    const response = await axios.get(url);

    const articles = response.data.articles.map(a => ({
      title: a.title,
      description: a.description,
      url: a.url
    }));

    res.json({ articles });
  } catch (error) {
    res.status(500).json({ error: "News API error" });
  }
});

module.exports = router;