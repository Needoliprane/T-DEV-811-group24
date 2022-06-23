const User = require("../../modules/users/models/User.model");

const users = [
	{
		email: "bobmarcel73@gmail.com",
		password: "pwd",
		firstName: "Bob",
		lastName: "Marcel",
		role: "admin",
	},
	{
		email: "leo.levacher@epitech.eu",
		password: "pwd",
		firstName: "Leo",
		lastName: "Levacher",
		role: "user",
	},
];

module.exports = {
	up: async () => User.insertMany(users),
	down: async () => User.deleteMany({}),
};
