const { Movie, Recomendation } = require("../models");
const axios = require("axios");

class RecomendationController {
  static async addToMyRecomendation(req, res, next) {
    try {
      const { movieId } = req.params;
      const { reason } = req.body;
      const baseURL = `https://api.themoviedb.org/3/movie/${movieId}`;

      const movie = await Movie.findByPK(movieId);
      if (!movie) {
        const response = await axios.get(baseURL, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        });
        const getMovie = response.data;
        let getGenres = getMovie.genres.map((el) => {
          return el.name;
        });
        if (getGenres.length > 1) {
          getGenres = getGenres.join(",");
        } else {
          getGenres = getGenres[0];
        }
        await Movie.create({
          id: getMovie.id,
          title: getMovie.title,
          genre: getGenres,
          releaseDate: getMovie.release_date,
          overview: getMovie.overview,
          rating: getMovie.vote_average,
          posterUrl: getMovie.poster_path,
          trailerUrl: "-",
        });
        await Recomendation.create({
          UserId: req.user.id,
          MovieId: getMovie.id,
          reason,
        });
        res.status(201).json({
          message: "Success add movie to your recomedation",
        });
      } else {
        await Recomendation.create({
          UserId: req.user.id,
          MovieId: movie.id,
          reason,
        });
        res.status(201).json({
          message: "Success add movie to your recomedation",
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RecomendationController;
