const axios = require("axios");
const Validator = require("jsonschema").Validator;
const v = new Validator();

const BASE_URL = `http://localhost:${process.env.PORT}`;
const axiosRequest = axios.create({
  baseURL: `${BASE_URL}/sleep`,
  validateStatus: () => true,
});

const allErrorResSchema = require("./schemas/all.error.res.schema.json");
const hotelsGetResSchema = require("./schemas/sleep/hotels.get.res.schema.json");
const hotelGetResSchema = require("./schemas/sleep/hotel.get.res.schema.json");

describe("/sleep", () => {
  describe("GET /hotels", () => {
    let params;
    beforeEach(() => {
      params = {
        search: "Limoges",
        adults_number: 1,
        checkin_date: new Date(new Date().setDate(new Date().getDate() + 2))
          .toISOString()
          .split("T")[0],
        checkout_date: new Date(new Date().setDate(new Date().getDate() + 4))
          .toISOString()
          .split("T")[0],
      };
    });
    it.each([
      ["search"],
      ["adults_number"],
      ["checkin_date"],
      ["checkout_date"],
    ])(
      "should return a bad request error if query.%s is missing",
      async (missing) => {
        delete params[missing];
        const response = await axiosRequest.get("/hotels", { params });
        expect(response.status).toEqual(400);
        expect(response.data).toBeTruthy();
        expect(
          v.validate(response.data, allErrorResSchema).errors
        ).toHaveLength(0);
      }
    );
    it("should return a status 200 with a series of hotels", async () => {
      const response = await axiosRequest.get("/hotels", { params });
      expect(response.status).toEqual(200);
      expect(response.data).toBeTruthy();
      expect(v.validate(response.data, hotelsGetResSchema).errors).toHaveLength(
        0
      );
    });
  });
  describe("get /details", () => {});
});
