const AuthController = require("../controllers/AuthController");

const authRouter = require("express").Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
authRouter.post("/login/google", AuthController.googleLogin);

module.exports = authRouter;
