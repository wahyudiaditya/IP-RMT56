const RecomendationController = require("../controllers/RecomendationController");
const UserController = require("../controllers/UserController");

const recommendationsRouter = require("express").Router();

recommendationsRouter.post(
  "/:movieId",
  RecomendationController.addToMyRecomendation
);
recommendationsRouter.get("/users", UserController.allUserRecommendations);

module.exports = recommendationsRouter;
