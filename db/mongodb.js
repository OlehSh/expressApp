const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`);
mongoose.connection.on('open', () => {
  console.log('MongoDB connection open');
})
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
module.exports =  mongoose;
