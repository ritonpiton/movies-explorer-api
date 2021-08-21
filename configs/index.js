require('dotenv').config();

const {
  JWT_SECRET, PORT, DATABASE_URL, NODE_ENV,
} = process.env;

const CURRENT_JWT_SECRET = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'some-secret-key';
const CURRENT_PORT = NODE_ENV === 'production' && PORT ? PORT : 3001;
const CURRENT_DATABASE_URL = NODE_ENV === 'production' && DATABASE_URL ? DATABASE_URL : 'mongodb://localhost:27017/moviesdb';

module.exports = {
  CURRENT_JWT_SECRET, CURRENT_PORT, CURRENT_DATABASE_URL,
};
