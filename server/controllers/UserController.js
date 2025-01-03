const { User, Preference, Movie, Recomendation } = require("../models");

class UserController {
  static async updateProfile(req, res, next) {
    try {
      const { name, profilePicture, favoriteActors, favoriteGenres } = req.body;
      if (!name) {
        throw { name: "BadRequest", message: "Name Required" };
      }
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        throw { name: "NotFound", message: "Invalid User" };
      }
      await user.update({ name, profilePicture });
      const preference = await Preference.findOne({
        where: {
          UserId: req.user.id,
        },
      });
      if (!preference) {
        await Preference.create({
          favoriteActors,
          favoriteGenres,
          UserId: req.user.id,
        });
        res.json({ message: "Success update profile" });
      } else {
        await preference.update({
          favoriteActors,
          favoriteGenres,
        });
        res.json({ message: "Success update profile" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async userInfo(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [
          {
            model: Preference,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Recomendation,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async allUserRecommendations(req, res, next) {
    try {
      const users = await User.findAll({
        include: {
          model: Recomendation,
          include: {
            model: Movie, // Menambahkan model Movies di dalam Recomendation
          },
        },
        attributes: { exclude: ["password", "googleId"] },
      });

      if (!users) {
        throw { name: "NotFound", message: "Users not found" };
      }
      res.json({ users });
    } catch (error) {
      next(error);
    }
  }

  static async userRecommendations(req, res, next) {
    try {
      const recomedations = await Recomendation.findAll({
        include: {
          model: Movie,
        },
        where: {
          UserId: req.user.id,
        },
      });
      if (!recomedations) {
        throw { name: "NotFound", message: "Recommendations not found" };
      }
      res.json(recomedations);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
