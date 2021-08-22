const userRouter = require('express').Router();
const { updateUserInfoValidator } = require('../middlewares/validations');

const {
  getCurrentUserInfo, updateUserInfo,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
userRouter.get('/me', getCurrentUserInfo);

// обновляет информацию о пользователе (email и имя)
userRouter.patch('/me', updateUserInfoValidator, updateUserInfo);

module.exports = userRouter;
