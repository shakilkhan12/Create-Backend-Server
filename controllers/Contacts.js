const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const TOKEN = process.env.ACCESS_TOKEN;
const VERSION = process.env.VERSION;
const LOCATION_ID = process.env.LOCATION_ID;
console.log(`${TOKEN}, ${VERSION}, ${LOCATION_ID}`);
class Contacts {
  async createContact(req, res) {
    console.log(req.body);
    // const { formMetaData } = req.body;
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

    // let options = {
    //   method: "POST",
    //   url: "https://api.msgsndr.com/contacts/",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${TOKEN}`,
    //     Version: VERSION,
    //   },
    //   data: {
    //     locationId: LOCATION_ID,
    //     firstName: "zahid",
    //     lastName: "zaman",
    //     name: "zahid zaman",
    //     email: "zahidzaman@deos.com",

    //     customFields: [
    //       {
    //         id: uuidv4(),
    //         field_value: "some custom field value",
    //       },
    //       {
    //         id: uuidv4(),
    //         field_value: "shakil khan custom",
    //       },
    //     ],
    //   },
    // };

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //     res.send(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  }
}
module.exports = new Contacts();
