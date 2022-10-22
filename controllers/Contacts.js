const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const TOKEN = process.env.ACCESS_TOKEN;
const VERSION = process.env.VERSION;
const LOCATION_ID = process.env.LOCATION_ID;
// console.log(`${TOKEN}, ${VERSION}, ${LOCATION_ID}`);
class Contacts {
  async createContact(req, res) {
    const customFields = [];
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
      Version: VERSION,
    };
    const { formMetaData } = req.body;
    for (const i in formMetaData) {
      let options = {
        method: "POST",
        url: `https://api.msgsndr.com/locations/${LOCATION_ID}/customFields`,
        headers,
        data: {
          name: i + uuidv4(),
          dataType: "TEXT",
        },
      };
      const customResponse = await axios.request(options);
      customFields.push({
        id: customResponse.id,
        field_value: formMetaData[i],
      });
    }
    console.log("custom fields: ", customFields);
    let contactOptions = {
      method: "POST",
      url: "https://api.msgsndr.com/contacts/",
      headers,
      data: {
        locationId: LOCATION_ID,
        firstName: "Izhar1",
        lastName: "Hussain1",
        name: "Izhar1 Hussain",
        email: "IzharHussain1@deos.com",
        customFields,
      },
    };

    axios
      .request(contactOptions)
      .then(function (response) {
        console.log(response.data);
        res.send(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
module.exports = new Contacts();
