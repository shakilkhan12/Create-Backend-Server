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
    const custom = await axios.get(
      `https://api.msgsndr.com/locations/${LOCATION_ID}/customFields`,
      {
        headers,
      }
    );
    // console.log(customResponse.data.customFields);
    let num = 0;
    for (let i in formMetaData) {
      customFields.push({
        id: custom.data.customFields[num],
        field_value: formMetaData[i],
      });
      num += num;
    }
    console.log("custom fields: ", customFields);
    // console.log("custom fields: ", customFields);
    let contactOptions = {
      method: "POST",
      url: "https://api.msgsndr.com/contacts/",
      headers,
      data: {
        locationId: LOCATION_ID,
        firstName: `Izhar1 ${uuidv4()}`,
        lastName: `Hussain1 ${uuidv4()}`,
        name: `Izhar1 Hussain ${uuidv4()}`,
        email: `IzharHussain${uuidv4()}@deos.com`,
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
