const https = require('https')

const requestHelper = {
  get: async (options) => new Promise((resolve, reject) => {
    https.get(options, (response) => {
      let data = ''
      response.on('data', (d) => {
        data += d
      })
      response.on('end', () => {
        response.data = JSON.parse(data)
        if (response.statusCode === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      })
    }).on("error", (err) => {
      reject(err)
    })
  }),
  post: async (options) => new Promise((resolve, reject) => {
    resolve('HTTP post')
  }),
  request: (options) => new Promise((resolve, reject) => {
      resolve('HTTP request')
    }),
}

module.exports = requestHelper
