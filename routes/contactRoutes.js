const { Router } = require("express");
const Contacts = require("../controllers/Contacts");
const router = Router();
router.post("/create", Contacts.createContact);
module.exports = router;
