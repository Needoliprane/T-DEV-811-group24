const axios = require("axios");
const { describe, expect, it } = require("@jest/globals");
const eventsGetResSchema = require("./schemas/enjoy/eventsGetRes.json");
const Validator = require("jsonschema").Validator;
const v = new Validator();

const BASE_URL = `http://localhost:${process.env.PORT}`;
const axiosRequest = axios.create({
  baseURL: `${BASE_URL}/enjoy`,
  validateStatus: () => true,
});

describe("/enjoy", () => {
  describe("GET /", () => {
    it("should send a status 400 if neither a query or an id was provided", async () => {
      const response = await axiosRequest.get("/");
      expect(response.status).toEqual(400);
      expect(response.data).toMatchObject({
        message: "params.query must contain at least one of [q, id]",
      });
    });
    it("should send a status 400 if both a query and an id were provided", async () => {
      const response = await axiosRequest.get("/", {
        params: {
          id: "AWBfUKA3EW6eBpXrGY",
          q: "Poitiers",
        },
      });
      expect(response.status).toEqual(400);
      expect(response.data).toMatchObject({
        message: "params.q must not exist simultaneously with [id]",
      });
    });
    it("should send a status 400 if an invalid param was added", async () => {
      const response = await axiosRequest.get("/", {
        params: { q: "Katy Perry", foo: "bar" },
      });
      expect(response.status).toEqual(400);
      expect(response.data).toMatchObject({
        message: "params.query.foo is not allowed",
      });
    });
    it("should send a status 200 and information about an event if an id was provided", async () => {
      const response = await axiosRequest.get("/", {
        params: {
          id: "6bZvTWrnzgfw3Gp6mm",
        },
      });
      expect(response.status).toEqual(200);
      expect(response.data).toBeTruthy();
      expect(v.validate(response.data, eventsGetResSchema).errors).toHaveLength(
        0
      );
    });
    it("should send a status 200 and a series of events if a query was provided", async () => {
      const response = await axiosRequest.get("/", {
        params: { q: "agriculture" },
      });
      expect(response.status).toEqual(200);
      expect(response.data).toBeTruthy();
      expect(v.validate(response.data, eventsGetResSchema).errors).toHaveLength(
        0
      );
    });
  });
  describe("GET /:location", () => {
    it("should send a status 400 if an invalid param was added", async () => {
      const response = await axiosRequest.get("/Paris", {
        params: { foo: "bar" },
      });
      expect(response.status).toEqual(400);
      expect(response.data).toMatchObject({
        message: "params.query.foo is not allowed",
      });
    });
    it("should send a status 200 and a series of events", async () => {
      const response = await axiosRequest.get("/Paris");
      expect(response.status).toEqual(200);
      expect(response.data).toBeTruthy();
      expect(v.validate(response.data, eventsGetResSchema).errors).toHaveLength(
        0
      );
    });
  });
  describe("GET /categories", () => {
    it("should return a series of categories", async () => {
      const response = await axiosRequest.get("/categories");
      expect(response.status).toEqual(200);
      expect(response.data).toMatchObject({
        categories: [
          "academic",
          "conferences",
          "expos",
          "concerts",
          "festivals",
          "performing-arts",
          "sports",
          "community",
        ],
      });
    });
  });
});
