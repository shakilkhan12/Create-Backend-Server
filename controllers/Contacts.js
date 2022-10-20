const axios = require("axios");
const TOKEN = process.env.ACCESS_TOKEN;
const VERSION = process.env.VERSION;
const LOCATION_ID = process.env.LOCATION_ID;
console.log(`${TOKEN}, ${VERSION}, ${LOCATION_ID}`);
class Contacts {
  async createContact(req, res) {
    console.log(req.body);

    // var options = {
    //   method: "POST",
    //   url: "https://api.msgsndr.com/contacts/",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${TOKEN}`,
    //     Version: VERSION,
    //   },
    //   data: {
    //     name: "kamran",
    //     email: "kamran@gmail.cm",
    //     locationId: "ONLi33uXrYjMgH4oP0Qq",
    //   },
    // };

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
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
