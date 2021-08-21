const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter } = require('./utils/limiter');
const appRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { CURRENT_PORT, CURRENT_DATABASE_URL } = require('./configs');

const app = express();

app.use(helmet());
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // подключаем парсер кук как мидлвэр
app.use(cors({ origin: true }));

// подключаемся к серверу mongo
mongoose.connect(`${CURRENT_DATABASE_URL}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger); // логгер запросов
app.use(limiter); // rate limiter

app.use('/', appRouter); // роут

app.use(errorLogger); // логгер ошибок

// здесь обрабатываем все ошибки
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик

app.listen(CURRENT_PORT, () => {
  console.log(`App listening on port ${CURRENT_PORT}`);
});
