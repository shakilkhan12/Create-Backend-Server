const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.post("/create", (req, res) => {
  res.json({ data: req.body });
});
app.get("/test", (req, res) => {
  res.json("Hello");
});
app.listen(PORT, () => {
  console.log("Server is running");
});
