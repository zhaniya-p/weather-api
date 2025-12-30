const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/latest/USD`;
    const response = await axios.get(url);

    res.json({
      base: "USD",
      rates: {
        EUR: response.data.conversion_rates.EUR,
        KZT: response.data.conversion_rates.KZT,
        RUB: response.data.conversion_rates.RUB
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Currency API error" });
  }
});

module.exports = router;