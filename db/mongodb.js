const mongoose = require('mongoose');
const logger = require('../lib/logger');

const options = {
  useNewUrlParser: true,
  reconnectTries: process.env.MONGO_CONNECT_MAX_TRIES,
  reconnectInterval : process.env.MONGO_RECONNECT_INTERVAL,
  };
const url = `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`
mongoose.connect(url, options);
mongoose.connection.once
mongoose.connection.on('open', () => {
  mongoose.set('bufferCommands', false);
  mongoose.set('useCreateIndex', true);
  logger.info(`MongoDB connection open on ${url}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('disconnected')
})
mongoose.connection.on('reconnected', () => {
  console.log('reconnected')
  console.log(`MongoDB reconnected on ${url}` )
})
mongoose.connection.on('reconnectFailed', () => {
  logger.info('reconnectFailed')
})
mongoose.connection.on('reconnectTries', () => {
  console.log('reconnectTries')
})
mongoose.connection.on('error', (error) => {
  logger.error(error)
  process.exit(1)
})
