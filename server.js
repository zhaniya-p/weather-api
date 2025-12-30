const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/weather", require("./routes/weather"));
app.use("/api/news", require("./routes/news"));
app.use("/api/currency", require("./routes/currency"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});