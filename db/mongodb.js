const mongoose = require('mongoose');
const logger = require('../lib/logger');

const options = {
  useNewUrlParser: true,
  reconnectTries: process.env.MONGO_CONNECT_MAX_TRIES,
  reconnectInterval: process.env.MONGO_RECONNECT_INTERVAL,
};
const url = `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`;
mongoose.connect(url, options);
mongoose.connection.on('open', () => {
  mongoose.set('bufferCommands', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('debug', true);
  logger.info(`MongoDB connection open on ${url}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
});
mongoose.connection.on('reconnected', () => {
  logger.info(`MongoDB reconnected on ${url}`);
});
mongoose.connection.on('reconnectFailed', () => {
  logger.info('reconnectFailed');
});
mongoose.connection.on('reconnectTries', () => {
  logger.info('reconnectTries');
});
mongoose.connection.on('error', (error) => {
  logger.error(error);
  process.exit(1);
});
