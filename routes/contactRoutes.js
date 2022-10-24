const { Router } = require("express");
const Contacts = require("../controllers/Contacts");
const router = Router();
router.post("/create", Contacts.createContact);
router.get("/contacts", Contacts.getContacts);
module.exports = router;
