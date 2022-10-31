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
    // console.log("body: ", req.body);
    function isNumber(n) {
      return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    }
    custom.data.customFields.forEach((record, index) => {
      let object = custom.data.customFields[index];
      let split = object.fieldKey.split(".")[1];
      const { formMetaData, subform_1, subform_2, subform_3 } = req.body;
      let fieldValue = "";
      if (req.body[split]) {
        fieldValue = req.body[split];
      } else if (formMetaData[split]) {
        fieldValue = formMetaData[split];
      } else if (subform_1 && subform_1[0][split]) {
        fieldValue = subform_1[0][split];
      } else if (subform_3 && subform_3[0][split]) {
        fieldValue = subform_3[0][split];
      } else if (subform_2 && subform_2[0][split]) {
        fieldValue = subform_2[0][split];
      } else {
        fieldValue = "";
      }
      if (isNumber(fieldValue) && isNumber(fieldValue) === 1) {
        fieldValue = "Yes";
      } else if (isNumber(fieldValue) && isNumber(fieldValue) === 0) {
        fieldValue = "No";
      }
      console.log(isNumber(fieldValue));
      // console.log(`value => ${split} type ${typeof fieldValue}`);
      customFields.push({
        id: object.id,
        field_value: fieldValue,
      });
    });
    customFields.forEach((c) => {
      console.log(`key ${c.id}, value => ${c.field_value}`);
    });
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
