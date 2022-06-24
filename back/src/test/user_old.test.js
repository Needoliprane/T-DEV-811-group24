const axios = require("axios");
const { describe, expect, it } = require("@jest/globals");
// const "core-js/stable";
const userPostReq = require("./schemas/user/userPostReq.json");
const userPostRes = require("./schemas/user/userPostRes.json");

const BASE_URL = "http://localhost:8000/";

describe("routes", () => {
  let token = "";
  let refreshtoken = "";

  it("Verify user does not exist yet", async () => {
    let body = {
      username: "pingouin",
      password: "banquise",
      email: "pingouin@banquise.com",
    };
    expect(body).toMatchObject(userPostReq);
    const response = await axios.post(BASE_URL + "user", body);
    expect(response.data).toBeTruthy();

    expect(response.data.status).toEqual(404);
  });

  it("creating user", async () => {
    let body = {
      username: "pingouin",
      password: "banquise",
      email: "pingouin@banquise.com",
    };
    expect(body).toMatchObject(userPostReq);

    const response = await axios.post(BASE_URL + "user", body);
    expect(response.data).toBeTruthy();
    expect(response.data).toMatchObject(userPostRes);
    expect(response.data.status).toEqual(200);
  });

  it("login user", async () => {
    let body = {
      username: "test",
      password: "test",
    };
    const response = await axios.post(BASE_URL + "connect", body);
    expect(response.data).toBeTruthy();
    console.log(response.data);
    expect(response.data.status).toEqual("ok");
    token = response.data.token;
    refreshtoken = response.data.refreshtoken;
  });

  it("deleting user", async () => {
    let body = {
      username: "test",
      password: "test",
    };
    const response = await axios.delete(BASE_URL + "user", {
      data: body,
      headers: {
        token: token,
        refreshtoken: refreshtoken,
      },
    });
    expect(response.data).toBeTruthy();
    // expect(response.data.status).toEqual('ok');
    console.log(response.data);
  });
});
