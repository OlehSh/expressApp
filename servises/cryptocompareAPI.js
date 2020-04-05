const requestHelper = require('../helper/requestHelper')
const { api } = require('../config/config')
const createError = require('http-errors')
const options = {
  host: `${api.cryptocompare.host}`,
  authorization: `Apikey ${api.cryptocompare.apiKey}`
}
const getSingleCurrency = async (from, convertTo) => {
  options.path = `/data/price?fsym=${from.toUpperCase()}&tsyms=${convertTo.toUpperCase()}`;
  const response = await requestHelper.get(options);
  if (!response.data) {
    throw createError(500, 'Response data is empty');
  }
  if (response.data && response.data.Response === "Error") {
    throw createError(400, response.data.Message);
  }
  return response;
}
module.exports = {
  getSingleCurrency
}
