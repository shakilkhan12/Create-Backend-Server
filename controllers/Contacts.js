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
    console.log(req.body);
    let emailOptions = {
      method: "GET",
      url: "https://api.msgsndr.com/contacts/search/duplicate",
      params: {
        locationId: LOCATION_ID,
        email: req.body.alpha_15,
      },
      headers,
    };

    axios
      .request(emailOptions)
      .then(function (response) {
        console.log("email response: ", response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    const custom = await axios.get(
      `https://api.msgsndr.com/locations/${LOCATION_ID}/customFields`,
      {
        headers,
      }
    );
    const newArray = Object.values(req.body);
    newArray.forEach((record, index) => {
      customFields.push({
        id: custom.data.customFields[index].id,
        field_value: record,
      });
    });

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
        email: `IzharHussain${uuidv4()}@contact.com`,
        customFields,
      },
    };

    // axios
    //   .request(contactOptions)
    //   .then(function (response) {
    //     console.log(response.data);
    //     res.send(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  }
  async getContacts(req, res) {
    var options = {
      method: "GET",
      url: "https://api.msgsndr.com/contacts/5VnJgTTlI9mCbtvIFOrV",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 8bfdc3104e16fa234c6c92ff9c14df4c5af14538",
        Version: "2021-04-15",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        response.data.contact.customFields.forEach((d) => {
          console.log(d);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
module.exports = new Contacts();
