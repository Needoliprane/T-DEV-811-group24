const axios = require("axios");
const { describe, expect, it } = require("@jest/globals");
const travelGetResSchema = require("./schemas/travel/travelGetRes.json");
const Validator = require("jsonschema").Validator;
const v = new Validator();

const BASE_URL = "http://localhost:" + process.env.PORT + "/api";
const route = "/travel";

describe("routes", () => {
  /*
  let token = "";
  let refreshtoken = "";

  it("get " + route, async () => {
    const response = await axios.get(
      BASE_URL + route + "/?address=16+rue+Voltaire+94270+Le+Kremlin-Bicêtre"
    );
    expect(response.data).toBeTruthy();
    expect(response.data).toMatchObject(travelGetResSchema);
    expect(v.validate(response.data, travelGetResSchema)).toBeTruthy();
    expect(response.data.status).toEqual(200);
  });*/
});
