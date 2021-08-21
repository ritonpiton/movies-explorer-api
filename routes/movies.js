/* eslint-disable max-len */
const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies, addMovie, deleteMovieById,
} = require('../controllers/movies');

// возвращает все сохранённые пользователем фильмы
movieRouter.get('/', getMovies);

movieRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    trailer: Joi.string().uri().required(),
    thumbnail: Joi.string().uri().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);

movieRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovieById);

module.exports = movieRouter;
