const { expressjwt } = require("express-jwt");
const config = require("../config/server.config");

const AuthMiddleware = {
	isAuthenticated: expressjwt({
		secret: config.auth.publicKey,
		algorithms: [config.auth.algorithm],
		audience: config.auth.aud,
		issuer: config.auth.iss,
	}),
	isAuthorized: (role) => (req, res, next) => {
		if (req.auth.role !== "admin" && req.auth.role !== role)
			return res.status(403).json({ message: "Forbidden" });
		next();
	},
};

module.exports = AuthMiddleware;
