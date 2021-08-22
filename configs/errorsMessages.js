module.exports = {
  // 500
  serverErrorMessage: 'На сервере произошла ошибка',
  // auth
  unauthorizedErrorMessage: 'Ошибка авторизации',
  // signup
  existEmailMessage: 'Пользователь с данным email уже существует',
  // signin
  wrongEmailOrPasswordMessage: 'Неправильные почта или пароль',
  // users
  notFoundUserMessage: 'Запрашиваемый пользователь не найден',
  conflictProfileEmailMessage: 'Указаный email не принадлежит текущему пользователю',
  // movies
  notFoundCardMessage: 'Запрашиваемая карточка не найдена',
  successfulDeleteMessage: 'Карточка фильма успешно удалена',
  deleteIsNotAllowedMessage: 'Недостаточно прав для удаления данной карточки',
  badRequestMessage: 'Некорректный запрос',
  wrongImageLinkMessage: 'Некорректная ссылка на постер',
  wrongTrailerLinkMessage: 'Некорректная ссылка на трейлер',
  wrongThimbnailLinkMessage: 'Некорректная ссылка на миниатюру',
};

// Joi helper message
module.exports.joiHelpersURLMessage = (field) => `"${field}" must be valid URL`;
