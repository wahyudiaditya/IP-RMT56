const { geminiFunFact, geminiRecomendation } = require("../helpers/gemini");
const { Movie, Preference } = require("../models");
const axios = require("axios");

class MovieController {
  static async getAllMovie(req, res, next) {
    try {
      const baseURL = "https://api.themoviedb.org/3/movie/popular";
      const { page } = req.query;

      const response = await axios.get(baseURL, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
        params: {
          page,
        },
      });
      res.json(response.data);
    } catch (error) {
      next(error);
    }
  }

  static async movieDetail(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(+id);

      if (!movie) {
        const baseURL = `https://api.themoviedb.org/3/movie/${id}`;

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
        const newMovie = await Movie.create({
          id: getMovie.id,
          title: getMovie.title,
          genre: getGenres,
          releaseDate: getMovie.release_date,
          overview: getMovie.overview,
          rating: getMovie.vote_average,
          posterUrl: getMovie.poster_path,
          trailerUrl: "-",
        });
        res.json(newMovie);
      } else {
        res.json(movie);
      }
    } catch (error) {
      next(error);
    }
  }

  static async funFactMovie(req, res, next) {
    try {
      const { id } = req.params;

      const movie = await Movie.findByPk(+id);

      if (!movie) {
        throw { name: "NotFound", message: "Movie Not Found" };
      }

      let funFact = await geminiFunFact(movie.title);

      res.json(funFact);
    } catch (error) {
      next(error);
    }
  }

  static async geminiRec(req, res, next) {
    try {
      const preference = await Preference.findOne({
        where: {
          UserId: req.user.id,
        },
      });

      if (!preference) {
        throw {
          name: "NotFound",
          message: "User has not completed preferences",
        };
      }

      let aiRec = await geminiRecomendation(
        preference.favoriteGenres,
        preference.favoriteActors
      );

      res.json(aiRec);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MovieController;
