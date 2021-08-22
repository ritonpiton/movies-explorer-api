const movieRouter = require('express').Router();
const { addMovieValidator, deleteMovieValidator } = require('../middlewares/validations');

const {
  getMovies, addMovie, deleteMovieById,
} = require('../controllers/movies');

// возвращает все сохранённые пользователем фильмы
movieRouter.get('/', getMovies);

movieRouter.post('/', addMovieValidator, addMovie);

movieRouter.delete('/:movieId', deleteMovieValidator, deleteMovieById);

module.exports = movieRouter;
