const { initConnection } = require("../database/connection");
const { up: seedUsers } = require("./seeders/seedUsers");
const mongoose = require("mongoose");

(async () => {
	try {
		await initConnection();
		await seedUsers();
		console.log("Database successfully seeded");
	} catch (err) {
		console.error(err.message);
		await mongoose.disconnect();
		process.exit(1);
	}
	await mongoose.disconnect();
})();
