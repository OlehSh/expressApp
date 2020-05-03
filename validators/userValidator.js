const {checkSchema, param} = require('express-validator');
const { Types } = require('mongoose')
const checkUpdateUser = checkSchema({
  firstName: {
    optional: true,
    isString: true,
  },
  lastName: {
    optional: true,
    isString: true,
  },
})
const checkUserId = param('id').customSanitizer(value => {
  return Types.ObjectId(value)
})
module.exports = {
  checkUserId,
  checkUpdateUser
}
