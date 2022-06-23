const axios = require("axios");
const { describe, expect, it } = require("@jest/globals");
const enjoyGetResSchema = require("./Schemas/enjoy/enjoyGetRes.json");
const Validator = require("jsonschema").Validator;
const v = new Validator();

const BASE_URL = "http://localhost:"+process.env.PORT+"/api";
const route = "/enjoy";

describe("routes", () => {
	let token = "";
	let refreshtoken = "";

	it("get " + route, async () => {
		const response = await axios.get(BASE_URL + route + "/?address=16+rue+Voltaire+94270+Le+Kremlin-Bicêtre");
		expect(response.data).toBeTruthy();
		expect(response.data).toMatchObject(enjoyGetResSchema);
		expect(v.validate(response.data, enjoyGetResSchema)).toBeTruthy();
		expect(response.data.status).toEqual(200);
	});
});
