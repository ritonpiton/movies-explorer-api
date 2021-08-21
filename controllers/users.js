const path = require('path');
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken

const User = require(path.join(__dirname, '../models/user'));

const BadRequestError = require('../errors/BadRequestError'); // 400
const UnauthorizedError = require('../errors/UnauthorizedError'); // 401
const NotFoundError = require('../errors/NotFoundError'); // 404
const ConflictError = require('../errors/ConflictError'); // 409
const {
  badRequestMessage, existEmailMessage, wrongEmailOrPasswordMessage, notFoundUserMessage,
} = require('../utils/errorMessages');

const { JWT_SECRET = 'some-secret-key' } = process.env;

module.exports.register = (req, res, next) => {
  const { email, name } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.send({
        data: {
          _id: user._id, email, name,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(badRequestMessage);
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError(existEmailMessage);
      }
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      throw new UnauthorizedError(wrongEmailOrPasswordMessage);
    })
    .catch(next);
};

// возвращает информацию о пользователе (email и имя)
module.exports.getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((me) => {
      res.status(200).send({
        data: {
          email: me.email,
          name: me.name,
        },
      });
    })
    .catch(next);
};

// обновляет информацию о пользователе (email и имя)
module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { email, name }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      if (!user) {
        throw new Error('NotFound');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(badRequestMessage);
      } else if (err.message === 'NotFound') {
        throw new NotFoundError(notFoundUserMessage);
      }
      next(err);
    })
    .catch(next);
};
