const axios = require("axios");
const userPostReq = require("../test/schemas/user/userPostReq.json");
const userPostRes = require("../test/schemas/user/userPostRes.json");
const userDelReq = require("../test/schemas/user/userDelReq.json");
const userDelRes = require("../test/schemas/user/userDelRes.json");
const allResErrorSchema = require("./schemas/error/allResErrorSchema");
const Validator = require("jsonschema").Validator;
const v = new Validator();
const BASE_URL = "http://localhost:" + process.env.PORT + "/api";
const { User } = require("../database/connection").models;
describe("/auth", () => {
  /*
  let token = "";
  let refreshtoken = "";
  let axiosConfig = {
    validateStatus: function (status) {
      return status; // prevent axios from throwing an error with status code outside the 2xx
    },
  };

  describe("POST /sign-up", () => {
    let body;

    beforeEach(() => {
      body = {
        email: "toto@gmail.com",
        password: "aPassword",
        firstName: "africa by",
        lastName: "toto",
      };
    });
    it("should return a bad request error when the body is missing the user email", async () => {
      delete body.email;
      const response = await axios.post(
        BASE_URL + "/auth/sign-up",
        body,
        axiosConfig
      );
      expect(response.status).toEqual(400);
      expect(response.data).toBeTruthy();
      expect(v.validate(response.data, allResErrorSchema)).toBeTruthy();
    });
  });*/
});
