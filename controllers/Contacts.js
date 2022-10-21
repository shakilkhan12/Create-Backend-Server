const axios = require("axios");
const TOKEN = process.env.ACCESS_TOKEN;
const VERSION = process.env.VERSION;
const LOCATION_ID = process.env.LOCATION_ID;
console.log(`${TOKEN}, ${VERSION}, ${LOCATION_ID}`);
class Contacts {
  async createContact(req, res) {
    console.log(req.body.formMetaData);
    const { formMetaData } = req.body;
    // const {
    //   alpha_1,
    //   alpha_2,
    //   alpha_3,
    //   alpha_4,
    //   alpha_5,
    //   alpha_6,
    //   alpha_7,
    //   alpha_8,
    // } = req.body;

    var options = {
      method: "POST",
      url: "https://api.msgsndr.com/contacts/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        Version: VERSION,
      },
      data: {
        locationId: LOCATION_ID,
        customFields: formMetaData,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
module.exports = new Contacts();
