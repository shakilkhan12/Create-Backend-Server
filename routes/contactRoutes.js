const { Router } = require("express");
const Contacts = require("../controllers/Contacts");
const router = Router();
router.post("/create", Contacts.createContact);
router.get("/users", Contacts.getData);
router.post("/create-post", Contacts.createPost);
module.exports = router;
