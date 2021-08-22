const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError'); // 400
const ForbiddenError = require('../errors/ForbiddenError'); // 403
const NotFoundError = require('../errors/NotFoundError'); // 404
const {
  notFoundCardMessage, deleteIsNotAllowedMessage, successfulDeleteMessage, badRequestMessage,
} = require('../configs/errorsMessages');

// возвращает все сохранённые пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer,
// nameRU, nameEN и thumbnail, movieId
module.exports.addMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    owner,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(badRequestMessage));
      }
      next(err);
    })
    .catch(next);
};

// удаляет сохранённый фильм по id
module.exports.deleteMovieById = (req, res, next) => {
  const thisMovie = req.params.movieId;
  Movie.findById(thisMovie)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(notFoundCardMessage));
      } else if (movie.owner.toString() === req.user._id) {
        movie.remove()
          .then(() => res.send({ message: successfulDeleteMessage }))
          .catch(next);
      } else {
        next(new ForbiddenError(deleteIsNotAllowedMessage));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(badRequestMessage));
      }
      next(err);
    })
    .catch(next);
};
