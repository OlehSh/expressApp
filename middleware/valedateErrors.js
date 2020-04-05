const { validationResult } = require('express-validator/check');

module.exports.validateErrors = (req, res, next) => {
  console.log('validateErrors');
  console.log(validationResult(req));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
