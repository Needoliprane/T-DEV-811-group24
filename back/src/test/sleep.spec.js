const axios = require("axios");
const { describe, expect, it } = require("@jest/globals");
const sleepGetResSchema = require("./Schemas/sleep/sleepGetRes.json");
const Validator = require("jsonschema").Validator;
const v = new Validator();

const BASE_URL = "http://localhost:"+process.env.PORT+"/api";
const route = "/sleep";

describe("routes", () => {
	let token = "";
	let refreshtoken = "";

	it("get " + route, async () => {
		const response = await axios.get(BASE_URL + route + "/?address=16+rue+Voltaire+94270+Le+Kremlin-Bicêtre");
		expect(response.data).toBeTruthy();
		expect(response.data).toMatchObject(sleepGetResSchema);
		expect(v.validate(response.data, sleepGetResSchema)).toBeTruthy();
		expect(response.data.status).toEqual(200);
	});
});
