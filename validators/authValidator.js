const {checkSchema} = require('express-validator/check');

const checkCreateUser = checkSchema({
  firstName: {
    optional: false,
    isString: true,
  },
  lastName: {
    optional: false,
    isString: true,
  },
  email: {
    isEmail: true,
    optional: false,
    isString: true,
  },
  password: {
    optional: false,
    isString: true,
  },
  confirmPassword: {
    optional: false,
    custom: {
      options: (val, {req, location, path}) => {
        return (val === req.body.password)
      },
      errorMessage: 'confirmPassword and password should be equal'
    }
  },
  phone: {
    optional: true,
    isString: true,
  },
})

module.exports = {
  checkCreateUser
}
