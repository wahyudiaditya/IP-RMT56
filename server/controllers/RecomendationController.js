const { Movie, Recomendation } = require("../models");
const axios = require("axios");

class RecomendationController {
  static async addToMyRecomendation(req, res, next) {
    try {
      const { movieId } = req.params;
      const { reason } = req.body;

      const recommedation = await Recomendation.findOne({
        where: {
          MovieId: movieId,
        },
      });
      if (recommedation) {
        throw { name: "BadRequest", message: "Cannot add same movie" };
      }
      await Recomendation.create({
        UserId: req.user.id,
        MovieId: movieId,
        reason,
      });
      res.status(201).json({
        message: "Success add movie to your recomedation",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RecomendationController;
