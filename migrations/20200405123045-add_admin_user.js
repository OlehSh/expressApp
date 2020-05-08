const bcrypt = require('bcrypt');
const { USER_ROLE } = require('../config/constants');

module.exports = {
  async up(db) {
    let password = process.env.USER_ADMIN_PASSWORD;
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR, 10));
    password = await bcrypt.hash(password, salt);
    await db.collection('users').insertOne({
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@test.com',
      userRole: USER_ROLE.ADMIN,
      password,
    });
  },

  async down(db) {
    await db.collection('users').deleteOne({ email: 'admin@test.com' });
  },
};
