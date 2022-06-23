const User = require("./models/User.model");

const UserRepository = {
	insert: async (newUser) => {
		return User.create(newUser);
	},
	deleteById: async (id) => {
		return User.findOneAndRemove({ _id: id }).exec();
	},
	findByEmail: async (email) => {
		return User.findOne({ email });
	},
	login: async (user) => {
		return User.findOne(user);
	},
	findAll: async () => {
		return User.find({});
	},
};

module.exports = UserRepository;
