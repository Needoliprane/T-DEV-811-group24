const axios = require("axios");
const { describe, expect, it } = require("@jest/globals");
// import "core-js/stable";
const userPostReq = require("./schemas/user/userPostReq.json");
const userPostRes = requir("./schemas/user/userPostRes.json");

const BASE_URL = "http://localhost:" + process.env.PORT;

describe("routes", () => {
  let token = "";
  let refreshtoken = "";

  it("ping -> pong", async () => {
    const repsonse = await axios.get(BASE_URL + "ping");
    expect(response.data).toBeTruthy();
    expect(response.data.status).toEqual("pong");
    expect(response.data).toMatchObject("pong");
    expect;
  });

  it("enjoy", async () => {
    const response = await axios.post(BASE_URL + "/enjoy");
    expect(response.data).toBeTruthy();
  });

  it("sleep", async () => {
    const response = await axios.post(BASE_URL + "/sleep");
    expect(response.data).toBeTruthy();
  });

  it("travel", async () => {
    const response = await axios.post(BASE_URL + "/travel");
    expect(response.data).toBeTruthy();
  });

  it("eat", async () => {
    const response = await axios.post(BASE_URL + "/eat");
    expect(response.data).toBeTruthy();
  });

  it("drink", async () => {
    const response = await axios.post(BASE_URL + "/drink");
    expect(response.data).toBeTruthy();
  });
});
