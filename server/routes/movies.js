const MovieController = require("../controllers/MovieController");

const moviesRouter = require("express").Router();

moviesRouter.get("/", MovieController.getAllMovie);
moviesRouter.get("/:id", MovieController.movieDetail);
moviesRouter.get("/funFacts/:id", MovieController.funFactMovie);

module.exports = moviesRouter;
