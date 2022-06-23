const axios = require("axios");
const { describe, expect, it } = require("@jest/globals");
const drinkGetResSchema = require("./Schemas/drink/drinkGetRes.json");
const Validator = require("jsonschema").Validator;
const v = new Validator();

const BASE_URL = "http://localhost:"+process.env.PORT+"/api";
const route = "/serviceType";

describe("routes", () => {
	let token = "";
	let refreshtoken = "";

	it("get service by type and city" + route, async () => {
		const response = await axios.get(BASE_URL + route + "/bar/Montauban");
		expect(response.data).toBeTruthy();
        // same result format as drink since we use the same api
		expect(v.validate(response.data, drinkGetResSchema)).toBeTruthy();
		expect(response.status).toEqual(200);
	});
});
