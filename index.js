const express = require("express");
const app = express();
app.post("/create", (req, res) => {
  res.json({ data: req.body });
});
app.listen(5000, () => {
  console.log("Server is running");
});
