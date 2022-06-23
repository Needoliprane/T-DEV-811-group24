const axios = require("axios");
const userPostReq = require("./Schemas/user/userPostReq.json");
const userPostRes = require("./Schemas/user/userPostRes.json");
const allResErrorSchema = require("./Schemas/error/allResErrorSchema");
const Validator = require("jsonschema").Validator;
const v = new Validator();
const BASE_URL = "http://localhost:" + process.env.PORT+"/api";
const { models } = require("../database/connection");

const userCredentials = { email: "leo.levacher@epitech.eu", password: "pwd" };

const adminCredentials = { email: "bobmarcel73@gmail.com", password: "pwd" };

describe("/users", () => {
	const axiosRequest = axios.create({
		baseURL: `${BASE_URL}/users`,
		validateStatus: () => true,
	});
	const axiosLogin = axios.create({
		baseURL: `${BASE_URL}/auth`,
	});
	describe("POST /", () => {
		let body;

		beforeEach(() => {
			body = {
				email: "toto@gmail.com",
				password: "aPassword",
				firstName: "africa by",
				lastName: "toto",
			};
		});
		describe("user login", () => {
			let options;

			beforeEach(async () => {
				const response = await axiosLogin.post("/login", userCredentials);
				options = {
					headers: { Authorization: `Bearer ${response.data.accessToken}` },
				};
			});
			it("should return a forbidden error when authenticated as a user", async () => {
				const response = await axiosRequest.post("/", body, options);
				expect(response.status).toEqual(403);
				expect(response.data).toMatchObject({ message: "Forbidden" });
			});
		});
		describe("admin login", () => {
			let options;

			beforeEach(async () => {
				const response = await axiosLogin.post("/login", adminCredentials);
				options = {
					headers: { Authorization: `Bearer ${response.data.accessToken}` },
				};
			});
			it("should return a bad request error when the body is missing the user email", async () => {
				delete body.email;
				const response = await axiosRequest.post(
					BASE_URL + "/users",
					body,
					options
				);
				expect(response.status).toEqual(400);
				expect(response.data).toBeTruthy();
				expect(
					v.validate(response.data, allResErrorSchema).errors
				).toHaveLength(0);
			});
			it("should return a 201 code when the user has been created succesfully", async () => {
				// check that user does not exist
				const user = await models.User.findOne({ email: body.email });
				expect(user).toBeNull();
				expect(v.validate(body, userPostReq).errors).toHaveLength(0);

				// create user
				const response = await axiosRequest.post(
					BASE_URL + "/users",
					body,
					options
				);
				expect(response.status).toEqual(201);
				expect(response.data).toBeTruthy();
				expect(v.validate(response.data, userPostRes).errors).toHaveLength(0);

				// check that user was created
				const newUser = (await models.User.find({ email: body.email }))[0];
				expect(newUser.email).toEqual("toto@gmail.com");
				expect(newUser.firstName).toEqual("africa by");
				expect(newUser.lastName).toEqual("toto");
				expect(newUser.password).toEqual("aPassword");
				expect(newUser.role).toEqual("user");
			});
		});
	});
	describe("DELETE /", () => {
		let id;

		beforeEach(async () => {
			id = (await models.User.findOne({ email: userCredentials.email })).id;
		});
		it("should return an unauthorized error when not logged in", async () => {
			const response = await axiosRequest.delete(`/${id}`);
			expect(response.status).toEqual(401);
			expect(response.data).toBeTruthy();
		});
		describe("user login", () => {
			let options;

			beforeEach(async () => {
				const response = await axiosLogin.post("/login", userCredentials);
				options = {
					headers: { Authorization: `Bearer ${response.data.accessToken}` },
				};
			});
			it("should return a forbidden error when logged in as a consultant", async () => {
				const response = await axiosRequest.delete(`/${id}`, options);
				expect(response.status).toEqual(403);
				expect(response.data).toBeTruthy();
				expect(
					v.validate(response.data, allResErrorSchema).errors
				).toHaveLength(0);
			});
		});
		describe("admin login", () => {
			let options;

			beforeEach(async () => {
				const response = await axiosLogin.post("/login", adminCredentials);
				options = {
					headers: { Authorization: `Bearer ${response.data.accessToken}` },
				};
			});
			it("should return a bad request error when the id is invalid", async () => {
				id = "foobar";

				const response = await axiosRequest.delete(`/${id}`, options);
				expect(response.status).toEqual(400);
				expect(response.data).toBeTruthy();
				expect(
					v.validate(response.data, allResErrorSchema).errors
				).toHaveLength(0);
			});
			it("should return a 200 code when the user has been deleted succesfully", async () => {
				const user = await models.User.findOne({ _id: id });
				expect(user).toBeTruthy();

				const response = await axiosRequest.delete(`/${id}`, options);
				expect(response.status).toEqual(200);
				expect(response.data).toBeFalsy();
				expect(await models.User.findOne({ _id: user.id })).toBeFalsy();
			});
		});
	});
});
