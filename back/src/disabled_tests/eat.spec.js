const axios = require("axios");
const { describe, expect, it } = require("@jest/globals");
const eatGetResSchema = require("./schemas/eat/eatGetRes.json");
const Validator = require("jsonschema").Validator;
const v = new Validator();

const BASE_URL = "http://localhost:" + process.env.PORT + "/api";
const route = "/eat";

describe("routes", () => {
  /*
  let token = "";
  let refreshtoken = "";

  it("get city" + route, async () => {
    const response = await axios.get(
      BASE_URL + route + "/find_restaurant_by_city/Le+Kremlin-Bicêtre"
    );
    expect(response.data).toBeTruthy();
    expect(v.validate(response.data, eatGetResSchema)).toBeTruthy();
    expect(response.status).toEqual(200);
  });
  */
});
