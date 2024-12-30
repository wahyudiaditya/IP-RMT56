const UserController = require("../controllers/UserController");

const userRouter = require("express").Router();

userRouter.post("/preferences", UserController.addPreference);
userRouter.get("/profiles", UserController.userInfo);
userRouter.post("/profiles", UserController.updateProfile);

module.exports = userRouter;
