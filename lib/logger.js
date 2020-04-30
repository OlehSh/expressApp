const bunyan = require('bunyan')

const log = bunyan.createLogger({
  name: 'expressApp',
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'error',
      path: './log/app-error.log'
    }
  ]

})
module.exports = log
