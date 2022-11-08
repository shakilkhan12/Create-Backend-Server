const { Router } = require("express");
const { authenticate, createReport } = require("../controllers/FastField");
const router = Router();
router.post("/auth", authenticate);
router.post("/create-report", createReport);
module.exports = router;
