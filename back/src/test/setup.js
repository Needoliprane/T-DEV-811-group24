const { initConnection, closeConnection } = require("../database/connection");

const {
	up: seedUsers,
	down: wipeUsers,
} = require("../database/seeders/seedUsers");

const cleanupDB = async () => {
	await wipeUsers();
};

const seedDB = async () => {
	await seedUsers();
};

beforeAll(async () => {
	await initConnection({ verbose: true });
});

beforeEach(async () => {
	await cleanupDB();
	await seedDB();
});

afterAll(async () => {
	await cleanupDB();
	await closeConnection();
});
