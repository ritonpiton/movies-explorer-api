const appRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { register, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

// роуты, не требующие авторизации
appRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), register);

appRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// роуты, требующие авторизацию (все остальные)
appRouter.use(auth);

appRouter.use('/users', usersRouter);
appRouter.use('/movies', moviesRouter);

appRouter.use('/', () => { throw new NotFoundError('Запрашиваемый ресурс не найден'); });

module.exports = appRouter;
