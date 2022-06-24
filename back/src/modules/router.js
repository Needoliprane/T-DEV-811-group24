const express = require("express");
const router = express.Router();
const UsersRouter = require("./users/users.router");
const AuthRouter = require("./auth/auth.router");
const DrinkRouter = require("./drink/drink.router")
const EatRouter = require("./eat/eat.router")
const ServiceTypeRouter = require("./serviceType/serviceType.router")
const EnjoyRouter = require("./enjoy/enjoy.router")
const SleepRouter = require("./sleep/sleep.router")
const TravelRouter = require("./travel/travel.router")
// const MeRouter = require('./me/me.router');
const { isAuthenticated, isAuthorized } = require('../middlewares/auth.middleware');

// router.use("ping")
router.use("/users", isAuthenticated, isAuthorized('admin'), UsersRouter);
// router.use('/me', isAuthenticated, meRouter);
router.use("/auth", AuthRouter);
router.use("/drink", DrinkRouter);
router.use("/eat", EatRouter);
router.use("/serviceType", ServiceTypeRouter)
router.use("/enjoy", EnjoyRouter)
router.use("/sleep", SleepRouter)
router.use("/travel", TravelRouter)

module.exports = router;
