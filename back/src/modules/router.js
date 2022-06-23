const express = require("express");
const router = express.Router();
const UsersRouter = require("./users/users.router");
const AuthRouter = require("./auth/auth.router");
const DrinkRouter = require("./drink/drink.router")
const EatRouter = require("./eat/eat.router")
const ServiceTypeRouter = require("./serviceType/serviceType.router")
const EnjoyRouter = require("./enjoy/enjoy.router")
const SleepRouter = require("./sleep/sleep.router")
// const MeRouter = require('./me/me.router');
const { isAuthenticated, isAuthorized } = require('../middlewares/auth.middleware');

// router.use("ping")
router.use("/api/users", isAuthenticated, isAuthorized('admin'), UsersRouter);
// router.use('/me', isAuthenticated, meRouter);
router.use("/api/auth", AuthRouter);
router.use("/api/drink", DrinkRouter);
router.use("/api/eat", EatRouter);
router.use("/api/serviceType", ServiceTypeRouter)
router.use("/api/enjoy", EnjoyRouter)
router.use("/api/sleep", SleepRouter)

module.exports = router;
