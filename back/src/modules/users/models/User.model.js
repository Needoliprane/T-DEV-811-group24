const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	email: { type: String, unique: true, required: true },
	firstName: { type: String },
	lastName: { type: String },
	password: { type: String, required: true },
	role: { type: String, default: "user", enum: ["admin", "user"] },
});

module.exports = mongoose.model("User", UserSchema);
