const mongoose = require("mongoose");
const config = require("../config/server.config");
const User = require("../modules/users/models/User.model.js");

const initConnection = async (options) => {
	if (mongoose.connection.readyState === 0)
		await mongoose
			.connect(config.database.connectionString, {
				useNewUrlParser: true,
			})
			.then((connection) => {
				if (options?.verbose === true) {
					mongoose.connection.on("open", () =>
						console.log(
							`Connection to the database ${connection.name}@${connection.host} succesfully established.`
						)
					);
					mongoose.connection.on("error", (err) => {
						console.error(err);
					});
				}
			})
			.catch((err) => {
				console.log("database connection error");
				console.log(err);
				process.exit(1);
			});
};

const closeConnection = () => mongoose.connection.close();

module.exports = {
	models: {
		User,
	},
	initConnection,
	closeConnection,
};
