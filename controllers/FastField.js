const axios = require("axios");
const FASTFIELD_API_AUTHORIZATION = process.env.FASTFIELD_API_AUTHORIZATION;
const FASTFIELD_API_KEY = process.env.FASTFIELD_API_KEY;
const SESSION_TOKEN = process.env.SESSION_TOKEN;
const FASTFIELD_API_URL = process.env.FASTFIELD_API_URL;
class FastField {
  async authenticate(req, res) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${FASTFIELD_API_AUTHORIZATION}`,
      "FastField-API-Key": FASTFIELD_API_KEY,
    };
    let Options = {
      method: "POST",
      url: "https://api.fastfieldforms.com/services/v3/authenticate",
      headers,
    };
    try {
      const { data } = await axios.request(Options);
      console.log("response: ", data);
      res.send(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  createReport(req, res) {
    const headers = {
      "Content-Type": "application/json",
      "X-Gatekeeper-SessionToken": `${SESSION_TOKEN}`,
      "FastField-API-Key": FASTFIELD_API_KEY,
    };
    let data = JSON.stringify({
      submissionId: "ea0e1bce-e563-4404-85a6-22222c",
      accountId: 3,
      formId: 305,
      formName: "Field Inspection",
      formVersion: 5,
      emailRecipientsOnSubmit: "",
      resubmit: false,
      userId: 10,
      userName: "user@gmail.com",
      alerts: [],
      formMetaData: {
        deviceMetaData: {
          appType: "web",
          appVersion: "1.0.60.c",
          device: "web",
        },
        fieldMetaData: [],
        startFormTimeStamp: "2019-04-17T20:14:51+00:00",
        endFormTimeStamp: "2019-04-17T20:14:59+00:00",
      },
      updatedAt: "2019-04-17T20:14:59+00:00",
      workflowData: {
        stage: "Form Submit Actions",
        nextStage: "",
      },
      alpha_1: "tessss",
      switchpicker_1: false,
      section_2: [
        {
          sectionCounter: 1,
          fields: {
            computedlabel_2: 0,
          },
        },
      ],
      submitId: "40f04dd6-578d-4f6e-b40c-813167e08eeb",
    });
    axios
      .request({
        method: "POST",
        url: FASTFIELD_API_URL,
        headers,
        data,
      })
      .then((response) => {
        console.log("pdf report: ", response);
        res.send(response);
      })
      .catch((err) => {
        console.log("pdf report error:", err);
        res.send(err.message);
      });
  }
}
module.exports = new FastField();
