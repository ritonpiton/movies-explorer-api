const appRouter = require('express').Router();
const { register, login } = require('../controllers/users');
const { signupValidator, signinValidator } = require('../middlewares/validations');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

// роуты, не требующие авторизации
appRouter.post('/signup', signupValidator, register);

appRouter.post('/signin', signinValidator, login);

// роуты, требующие авторизацию (все остальные)
appRouter.use(auth);

appRouter.use('/users', usersRouter);
appRouter.use('/movies', moviesRouter);

appRouter.use('/', () => { throw new NotFoundError('Запрашиваемый ресурс не найден'); });

module.exports = appRouter;
