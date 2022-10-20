const axios = require("axios");
const TOKEN = process.env.ACCESS_TOKEN;
const VERSION = process.env.VERSION;
const LOCATION_ID = process.env.LOCATION_ID;
console.log(`${TOKEN}, ${VERSION}, ${LOCATION_ID}`);
class Contacts {
  async createContact(req, res) {
    console.log(req.body);
    const {
      alpha_1,
      alpha_2,
      alpha_3,
      alpha_4,
      alpha_5,
      alpha_6,
      alpha_7,
      alpha_8,
    } = req.body;

    var options = {
      method: "POST",
      url: "https://api.msgsndr.com/contacts/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        Version: VERSION,
      },
      data: {
        firstName: alpha_1,
        lastName: alpha_2,
        name: alpha_3,
        email: alpha_4,
        locationId: LOCATION_ID,
        phone: alpha_5,
        address1: alpha_6,
        city: alpha_7,
        website: alpha_8,
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
  async getData(req, res) {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }
  async createPost(req, res) {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          userId: 1200,
          id: 12000,
          title: "my todo title",
          completed: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }
}
module.exports = new Contacts();
