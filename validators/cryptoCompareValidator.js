const { checkSchema } = require('express-validator');

const checkSinglePriseRequest = checkSchema({
  from: {
    isString: true,
    optional: false,
    errorMessage: '\'from\' param is required an should be string',
  },
  convertTo: {
    isString: true,
    optional: false,
    errorMessage: '\'convertTo\' param is required an should be string',
  },
});

module.exports = {
  checkSinglePriseRequest,
};
