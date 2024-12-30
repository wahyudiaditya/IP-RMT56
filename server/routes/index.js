const router = require("express").Router();
const { authentication } = require("../middlewares/auth");
const authRouter = require("./auth");
const moviesRouter = require("./movies");
const userRouter = require("./user");

router.use("/auths", authRouter);

router.use(authentication);
router.use("/users", userRouter);
router.use("/movies", moviesRouter);
module.exports = router;
