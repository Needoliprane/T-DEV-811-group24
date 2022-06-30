const AuthService = require("./auth.service.js");
const UsersService = require("../users/users.service.js");

const AuthController = {
	login: async (req, res) => {
		const { email, password } = req.body;
		try {
			return res.json({
				accessToken: await AuthService.login(email, password),
				tokenType: "Bearer",
			});
		} catch (err) {
			console.log(err);
			if (err.message == "Invalid login") return res.status(400).json(err);
			return res.status(500).json({ message: "Internal Server Error" });
		}
	},
	signup: async (req, res) => {
		try {
			const user = {
				_id: result._id,
				firstName: result.firstName,
				lastName: result.lastName,
				email: result.email,
				role: 'user',
			};
			await UsersService.insert(req.body);
			return res.status(201).send();
		} catch (err) {
			if (err.code === 11000)
				return res.status(400).json({ message: err.message });
			return res.status(500).json({ message: "Internal Server Error" });
		}
	},
	checkPassword: async (req, res) => {
		try {
			await UsersService.checkPassword(req.body);
		} catch (err) {
			return res.status(500).json({ message: "Internal Server Error" });
		}
	},
};

module.exports = AuthController;
