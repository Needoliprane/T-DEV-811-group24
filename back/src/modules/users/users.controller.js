const UsersService = require("./users.service");

const UsersController = {
	insert: async (req, res) => {
		try {
			const newUser = await UsersService.insert(req.body);
			return res.status(201).json(newUser);
		} catch (err) {
			if (err.code === 11000)
				return res.status(400).json({ message: err.message });
			return res.status(500).json({ message: "Internal Server Error" });
		}
	},
	delete: async (req, res) => {
		try {
			await UsersService.deleteById(req.params.id);
			return res.status(200).send();
		} catch (err) {
			return res.status(500).json({ message: "Internal Server Error" });
		}
	},
	getAll: async (_req, res) => {
		try {
			const users = await UsersService.getAll();
			return res.status(200).json(users);
		} catch (err) {
			return res.status(500).json({ message: "Internal Server Error" });
		}
	},
};

module.exports = UsersController;
