const express = require("express");
require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const fastFieldRoutes = require("./routes/fastFieldRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/", contactRoutes);
app.use("/api", fastFieldRoutes);
app.get("/", (req, res) => {
  res.json("Welcome to FastFieldsForm");
});
app.listen(PORT, () => {
  console.log(`Backend URL: http://localhost:${PORT}`);
});
