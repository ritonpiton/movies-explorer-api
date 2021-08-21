const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCurrentUserInfo, updateUserInfo,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
userRouter.get('/me', getCurrentUserInfo);

// обновляет информацию о пользователе (email и имя)
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
}), updateUserInfo);

module.exports = userRouter;
