const axios = require("axios");
const TOKEN = process.env.ACCESS_TOKEN;
const VERSION = process.env.VERSION;
const LOCATION_ID = process.env.LOCATION_ID;
class Contacts {
  async createContact(req, res) {
    console.log(req.body);
    const response = await axios.post(
      "https://api.msgsndr.com/contacts/",
      {
        name: req.body.alpha_1,
        email: alpha_2,
        locationId: LOCATION_ID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
          Version: VERSION,
        },
      }
    );
    res.json({ data: req.body, response });
  }
}
module.exports = new Contacts();
