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
    // const { formMetaData } = req.body;
    // console.log(req.body);
    const custom = await axios.get(
      `https://api.msgsndr.com/locations/${LOCATION_ID}/customFields`,
      {
        headers,
      }
    );
    // console.log("req body: ", req.body);
    const {
      ["submissionId"]: submissionId,
      ["accountId"]: accountId,
      ["formId"]: formId,
      ["formName"]: formName,
      ["formVersion"]: formVersion,
      ["displayReferenceValue"]: displayReferenceValue,
      ["emailRecipientsOnSubmit"]: emailRecipientsOnSubmit,
      ["resubmit"]: resubmit,
      ["userId"]: userId,
      ["userName"]: userName,
      ["alerts"]: alerts,
      ["updatedAt"]: updatedAt,
      ["workflowData:"]: workflowData,
      ["submitId"]: submitId,
      ...modifiedBody
    } = req.body;
    const newArray = Object.values(modifiedBody);

    console.log(req.body);
    newArray.forEach((record, index) => {
      let key = custom.data.customFields[index].fieldKey;
      // contact.property_year
      let split = key.split(".")[1];

      // console.log(`key: ${split} => ${req.body[split]}`);
      // console.log("Get value from body :=> ", req.body);
      customFields.push({
        id: custom.data.customFields[index].id,
        field_value: req.body[split],
        // just up add the filed value vv
      });
    });
    // console.log("custom fields: ", customFields);
    // console.log("custom fields response: ", custom.data);
    // process.exit();

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
        // console.log("email response: ", response.data);
        if (response.data.contact !== null) {
          let contactOptions = {
            method: "PUT",
            url: `https://api.msgsndr.com/contacts/${response?.data?.contact?.id}`,
            headers,
            data: {
              customFields,
            },
          };

          axios
            .request(contactOptions)
            .then(function (response) {
              // console.log(response.data);
              res.send(response.data);
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      })
      .catch(function (error) {
        console.error(error);
      });

    // console.log("custom fields: ", customFields);
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
