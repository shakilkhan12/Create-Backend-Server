const express = require("express");
const app = express();
app.post("/create", (req, res) => {
  res.json({ data: req.body });
});
app.get("/test", (req, res) => {
  res.json("Hello");
});
app.listen(5000, () => {
  console.log("Server is running");
});
