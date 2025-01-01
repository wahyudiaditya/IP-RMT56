const router = require("express").Router();
const { authentication } = require("../middlewares/auth");
const authRouter = require("./auth");
const moviesRouter = require("./movies");
const recommendationsRouter = require("./recommendations");
const userRouter = require("./user");

router.use("/auths", authRouter);

router.use(authentication);
router.use("/users", userRouter);
router.use("/movies", moviesRouter);
router.use("/recommendations", recommendationsRouter);
module.exports = router;
