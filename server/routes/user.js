const UserController = require("../controllers/UserController");

const userRouter = require("express").Router();

userRouter.get("/profiles", UserController.userInfo);
userRouter.put("/profiles", UserController.updateProfile);
userRouter.get("/recommendations", UserController.userRecommendations);

module.exports = userRouter;
