const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../config/server.config");

const UserRepository = require("../users/user.repository");

const invalidLoginError = { message: "Invalid login" };

const AuthService = {
	checkPassword: async (userPassword, dbPassword) => {
		return userPassword === dbPassword;
	},
	login: async (email, password) => {
		const user = await UserRepository.findByEmail(email);
		if (!user) throw invalidLoginError;

		if ((await AuthService.checkPassword(password, user.password)) == false)
			throw invalidLoginError;
		const token = await AuthService.generateToken(user);
		return token;
	},
	generateToken: async (user) =>
		jwt.sign(
			{
				id: user.id,
				role: user.role,
				firstName: user.firstName,
				lastName: user.lastName,
			},
			config.auth.privateKey,
			{
				algorithm: config.auth.algorithm,
				expiresIn: config.auth.expiresIn,
				audience: config.auth.aud,
				issuer: config.auth.iss,
				subject: user.email,
			}
		),
};

module.exports = AuthService;
