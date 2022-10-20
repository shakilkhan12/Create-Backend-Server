const express = require("express");
const contactRoutes = require("./routes/contactRoutes");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/", contactRoutes);
app.get("/", (req, res) => {
  res.json("Welcome to FastFieldsForm");
});
app.listen(PORT, () => {
  console.log(`Backend URL: http://localhost:${PORT}`);
});
