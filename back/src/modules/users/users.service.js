const UserRepository = require("./user.repository");

const UsersService = {
	insert: async (newUser) => {
		const result = await UserRepository.insert(newUser);
		return {
			_id: result._id,
			firstName: result.firstName,
			lastName: result.lastName,
			email: result.email,
			role: result.role,
		};
	},
	deleteById: async (id) => UserRepository.deleteById(id),
	getByEmail: async (email) => UserRepository.findByEmail(email),
	getAll: async () => UserRepository.findAll(),
	login: async (user) => UserRepository.login(user),
};

module.exports = UsersService;
