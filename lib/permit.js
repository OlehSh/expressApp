const { USER_ROLE } = require('../config/constants')
module.exports.permit = (userRoles) => {
  return (request, response, next) => {
    if (request.userRole && userRoles.indexOf(request.userRole)) next();
    else {
      response.status(403).json({ message: 'Not enough permissions' });
    }
  };
}
module.exports.accessLevels = {
  ADMIN: [USER_ROLE.ADMIN],
  USER: [USER_ROLE.USER],
  ALL: [USER_ROLE.ADMIN, USER_ROLE.USER],
}
