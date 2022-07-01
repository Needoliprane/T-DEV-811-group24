print('Creating user')
db.createUser({
	user: "user",
	pwd: "pwd",
	roles: [
		{
			role: "readWrite",
			db: "epicRoadTrip",
		},
	],
});
print('User created')
